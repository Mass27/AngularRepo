using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AnimationManager : MonoBehaviour
{
    // Start is called before the first frame update
    private Animator anim;


    private void Awake()
    {
       
        anim = GetComponent<Animator>();
    }

    public void Disablejump()
    {

        anim.SetBool("IsJumping", false);

    }
}
