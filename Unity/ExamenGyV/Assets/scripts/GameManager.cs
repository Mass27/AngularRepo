using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    // Start is called before the first frame update

    private playerController playerController; 

    public static GameManager Instance;
    public Slider lifeUi;
    private void Awake()
    {
        if (Instance == null)
            Instance = this;
        else
            Destroy(gameObject);

        if(PlayerPrefs.GetFloat("X") == 0 && PlayerPrefs.GetFloat("Y") == 0 && PlayerPrefs.GetFloat("Z") == 0)
        {
            PlayerPrefs.SetFloat("X", 5.217742f);
            PlayerPrefs.SetFloat("Y", 18.403f);
            PlayerPrefs.SetFloat("Z", -22.22004f);

        }
        playerController = GameObject.FindGameObjectWithTag("Player").GetComponent<playerController>();
    }

    public void ShowMessage()
    {
        Debug.Log("Mostrando mensaje desde el Game Manager");

    }

    public void updateLife()
    {
        lifeUi.value = playerController.life;
    }


    void Start()
    {
        Cursor.lockState = CursorLockMode.Locked;  
        Cursor.visible = false;
    }

    // Update is called once per frame
   
}
