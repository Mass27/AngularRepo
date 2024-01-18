import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { saveAs } from 'file-saver';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private worker: Worker;

  constructor(private papa: Papa) {
    // Inicializar el Web Worker
    this.worker = new Worker('./csv-worker.worker.ts', { type: 'module' });
  }

  processCSV(file: File, batchSize: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const config = {
        complete: (result: any) => {
          console.log('CSV parsing complete');
          const data = result.data as any[];
          this.processDataInBatches(data, batchSize)
            .then(() => {
              // Solo enviar el resultado al Web Worker
              this.worker.postMessage({ isLastBatch: true, processedData: data });
              resolve();
            })
            .catch((error) => reject(error));
        },
        header: true,
        skipEmptyLines: true,
        delimiter: ';',
      };

      this.worker.onmessage = ({ data }) => {
        console.log('Received message from worker:', data);
        if (data.isLastBatch) {
          // No resolvemos aquí, dejamos que la lógica de processDataInBatches se encargue
        }
      };

      this.worker.postMessage({ file, batchSize, config });
    });
  }



  private processDataInBatches(data: any[], batchSize: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const totalBatches = Math.ceil(data.length / batchSize);
      const processedDataArray: any[] = [];

      const processNextBatch = async (batchIndex: number) => {
        if (batchIndex >= totalBatches) {
          // Todos los lotes han sido procesados, resuelve la promesa principal
          resolve(processedDataArray);
          return;
        }

        const start = batchIndex * batchSize;
        const end = Math.min((batchIndex + 1) * batchSize, data.length);
        const batch = data.slice(start, end);

        // Enviar el lote al Web Worker para su procesamiento
        this.worker.onmessage = ({ data }) => {
          console.log('Received message from worker:', data);
          if (data.isLastBatch) {
            // Si es el último lote, resuelve la promesa principal
            resolve(processedDataArray);
          } else {
            // Almacena los datos procesados en el array
            processedDataArray.push(...data.processedData);
            // Procesa el siguiente lote
            processNextBatch(batchIndex + 1);
          }
        };

        this.worker.postMessage({ batchIndex, batchSize, dataBatch: batch });
      };

      // Comienza el procesamiento con el primer lote
      processNextBatch(0);
    });
  }

  private convertToCSV(data: any[]): string {
    return this.papa.unparse({
      fields: Object.keys(data[0]),
      data: data,
    });
  }

  private saveCSVToFile(csvData: string, fileName: string): void {
    console.log('Saving CSV to file:', fileName);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, fileName);
  }

  private async processAndSaveBatch(batchIndex: number, processedData: any[]): Promise<void> {
    try {
      const csvData = this.convertToCSV(processedData);
      const fileName = `batch_${batchIndex + 1}.csv`;
      console.log('Processing and saving batch:', batchIndex);
      this.saveCSVToFile(csvData, fileName);
    } catch (error) {
      console.error('Error processing and saving batch:', error);
    }
  }
}
