using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public class DetectionArea : MonoBehaviour
{
    // Start is called before the first frame update
 
    private playerController playerController;
    public UnityEvent detectionEvent;




    private void Awake()
    {
       playerController = GameObject.FindGameObjectWithTag("Player").GetComponent<playerController>();
    }


    private void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.CompareTag("Player")) {
        
        detectionEvent.Invoke();
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.gameObject.CompareTag("Player"))
        {

            playerController.SetIsFalling(false);
        }
    }

    public void Respawn(Transform pointToSpawn)
    {
        playerController.transform.position = pointToSpawn.position;
    }


}
