# Todo List 
 ### Please review readmy file while opening the link https://davtian001.github.io/todo-list-firebase-dist


Please see the mentioned digits from the images and check corresponding requirements.


* ## Routing ##
  * Router Guards (canActivate, canLoad)
  * Not Found 404 (Page) 
  
  
* ## Authentication ##
   * ### Sign-In ###
     * form validators (email, pass)
     * show password (4)
     * link: open Sign-Up link(3)
     * Remember user (keep auth sesion)(2)

     ![image2](https://i.ibb.co/f8ZM3qc/sign-in.png)
      
  * ### Sign-Up (send e-mail veryfication link)
    * Reactive form validators (async, sync)
    * Real time e-mail validation (is busy email) (1) async validation
    * link to: Reset Password modal
    * link: open Sign-Up link

    ![image2](https://i.ibb.co/bNSxLv1/sign-uppng.png)
    
  * ### Reset-password (send e-mail veryfication link)
    * Reset Password with Email message (it will send confirmation link to selected email and user can reset password)
    * Real time e-mail validation (email must be registered) async validation

    ![image2](https://i.ibb.co/ZMfbGDk/reset-pass.png)
    ![image2](https://i.ibb.co/q0ngY1d/reset-pass1.png)
    
    
  * ### Dashboard
    ![image2](https://i.ibb.co/6ZdDQLk/table1png.png)
        
    * Table with local pagination
    * Search by task name(local)
    * Task Actions
      * Edit Task (title, description), (it should open the modal above)
        ![image2](https://i.ibb.co/phSgDsk/editPNG.png)
        
      * Change status
      * Delete (popup-confirm)
      
    * Create new Task panel
    * Expired ticket date
      ![image2](https://i.ibb.co/tDd42vT/table2.png)
  
  
### Database Angular Firebase ###
* Created mock data for new users. By default, the newly registered user will have some tickets
