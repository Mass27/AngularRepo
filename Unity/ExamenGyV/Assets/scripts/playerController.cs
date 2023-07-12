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
    private int currentJump = 1;
    private bool isTripleJumping;
    private bool isFalling;


    [Header("Stats")]
    public float speedMovement;
    public float turnTime = 0.2f;
    public float jumpHeight = 3;
    public float jumpForce = -2;
    public float jumpTime = 3.5f;
    public int life = 100;
    public int maxLives = 3;
    private int remainingLives;



    [Header("References")]
    public Transform floor;
    public float floorDistance = 0.1f;
    public LayerMask layerFloor;
    public Transform mainCamera;



    private void Awake()
    {
        transform.position = new Vector3(PlayerPrefs.GetFloat("X"),
            PlayerPrefs.GetFloat("Y"),
            PlayerPrefs.GetFloat("Z"));

        controller = GetComponent<CharacterController>();
        anim =  transform.GetChild(0).GetComponent<Animator>();

        remainingLives = maxLives;

    }


    // Update is called once per frame
    private void Update()
    {
        if (!isFalling)
        {
            Walk();
            jumpManager();
            Die();

        }
       
        anim.SetFloat("YVelocity", velocity.y);
        
    }
    public void SetIsFalling(bool value)
    {
        isFalling = value;

    }

    private void jumpManager()
    {
        switch (currentJump)
        {
            case 1:
                Jump(jumpHeight);
                break;
            case 2:
                Jump(jumpHeight + jumpHeight / 2);
                break;
            case 3:
                Jump(2 * jumpHeight);
                break;

        }

    }



    private void Walk()
    {
        float X = Input.GetAxisRaw("Horizontal");
        float Z = Input.GetAxisRaw("Vertical");


        Vector3 direction = new Vector3(X,0,Z);

        if(direction != Vector3.zero)
        {
            anim.SetBool("isMoving", true);
            float rotationAngle = Mathf.Atan2(direction.x, direction.z) * Mathf.Rad2Deg + mainCamera.transform.eulerAngles.y;
            float angle = Mathf.SmoothDampAngle(transform.eulerAngles.y,rotationAngle, ref turnVelocity, turnTime);
            Vector3 movemenetDirection = Quaternion.Euler(0, rotationAngle, 0) * Vector3.forward;
            transform.rotation = Quaternion.Euler(0, angle, 0);
            controller.Move(movemenetDirection.normalized * speedMovement * Time.deltaTime);

        }else
            anim.SetBool("isMoving", false);
    }

   private void Jump(float height)
    {

        inFloor = Physics.CheckSphere(floor.position, floorDistance, layerFloor);
        anim.SetBool("inFloor", inFloor);
        if ( inFloor && velocity.y < 0)
         velocity.y = jumpForce;
        
        if(Input.GetKeyDown(KeyCode.Space) && inFloor)
        {
            anim.SetInteger("currentJump", currentJump);
            if (currentJump >= 3)
                currentJump = 1;
            else
                currentJump++;

            velocity.y = Mathf.Sqrt(height * jumpForce * gravity);
            anim.SetBool("IsJumping", true);

        }
      

        velocity.y += gravity * Time.deltaTime;
        controller.Move(velocity * Time.deltaTime);
   }



    public void ReceiveDamage()
    {

        life -= 33;
        remainingLives--;
        GameManager.Instance.updateLife();

        if (remainingLives <= 0)
        {
            Die();
        }
    }

    public void ReceiveDamage(int damage)
    {
        life -= damage;
        GameManager.Instance.updateLife();

    }

    private void Die()
    {
        if(life <=0)
            gameObject.SetActive(false);
    }




    private void OnControllerColliderHit(ControllerColliderHit hit)
    {

        if (hit.gameObject.CompareTag("Floor"))
        {
            if (!isTripleJumping)
                StartCoroutine(touchFloor());

        }


    }

    private IEnumerator touchFloor() {
    

        isTripleJumping = true;
        yield return new WaitForSeconds(jumpTime);
        currentJump = 1;
        isTripleJumping= false;
    }




}
