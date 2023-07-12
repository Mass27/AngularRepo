using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class checkPoint : MonoBehaviour
{
    public Transform pointToSpawn;


    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {


            PlayerPrefs.SetFloat("X", gameObject.transform.position.x);
            PlayerPrefs.SetFloat("Y", gameObject.transform.position.y);
            PlayerPrefs.SetFloat("Z", gameObject.transform.position.z);


            pointToSpawn.position = gameObject.transform.position;
        }
    }


}
