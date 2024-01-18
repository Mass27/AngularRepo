try {
  // Lógica del worker...
  addEventListener('message', ({ data }) => {
    const { batchIndex, batchSize, dataBatch } = data;

    // Aquí defines la función processDataBatch
    function processDataBatch(batch: any[]): any[] {
      // Lógica para procesar un lote de datos aquí
      const processedBatch = batch.map(item => ({ ...item, processed: true }));
      console.log(`Processed batch ${batchIndex + 1}:`, processedBatch);
      return processedBatch;
    }

    // Aquí puedes realizar el procesamiento específico para un lote
    const processedData = processDataBatch(dataBatch);

    // Verificar si es el último lote y enviar la respuesta
    if (batchIndex === batchSize - 1) {
      console.log('Sending processed data to main thread:', processedData);
      postMessage({ batchIndex, processedData, isLastBatch: true });
    }
  });
} catch (error) {
  console.error('Error:', error);
}
