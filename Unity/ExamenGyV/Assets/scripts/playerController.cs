using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class playerController : MonoBehaviour
{
    private CharacterController controller;
    private Animator anim;
    private float turnVelocity;
    private Vector3 velocity;
    private float gravity = -9.8f;
    private bool inFloor;

    [Header("Stats")]
    public float speedMovement;
    public float turnTime = 0.2f;
    public float jumpHeight = 3;
    public float jumpForce = -2;

    [Header("References")]
    public Transform floor;
    public float floorDistance = 0.1f;
    public LayerMask layerFloor;
    public Transform mainCamera;



    private void Awake()
    {
        controller = GetComponent<CharacterController>();
        anim = GetComponent<Animator>();
    }


    // Update is called once per frame
    private void Update()
    {

        Walk();
       Jump();
        anim.SetFloat("YVelocity", velocity.y);
        
    }

    private void Walk()
    {
        float X = Input.GetAxisRaw("Horizontal");
        float Z = Input.GetAxisRaw("Vertical");


        Vector3 direction = new Vector3(X,0,Z);

        if(direction != Vector3.zero)
        {
            anim.SetBool("isMoving", true);
            float rotationAngle = Mathf.Atan2(direction.x, direction.z) * Mathf.Rad2Deg * mainCamera.transform.eulerAngles.y;
            float angle = Mathf.SmoothDampAngle(transform.eulerAngles.y,rotationAngle, ref turnVelocity, turnTime);
            Vector3 movemenetDirection = Quaternion.Euler(0, rotationAngle, 0) * Vector3.forward;
            transform.rotation = Quaternion.Euler(0, angle, 0);
            controller.Move(movemenetDirection.normalized * speedMovement * Time.deltaTime);

        }else
            anim.SetBool("isMoving", false);
    }

    public void Disablejump()
    {

        anim.SetBool("IsJumping", false);



    }
   private void Jump()
    {

        inFloor = Physics.CheckSphere(floor.position, floorDistance, layerFloor);
        anim.SetBool("inFloor", inFloor);
        if ( inFloor && velocity.y < 0)
         velocity.y = jumpForce;
        
        if(Input.GetKeyDown(KeyCode.Space) && inFloor)
        {
            velocity.y = Mathf.Sqrt(jumpHeight * jumpForce * gravity);
            anim.SetBool("IsJumping", true);

        }
      

        velocity.y += gravity * Time.deltaTime;
        controller.Move(velocity * Time.deltaTime);
   }

}
