import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { User } from './user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  term:string='';
  searchText:string="";
  FilteredUser!: User[];
  hiddenView:boolean=false;
  inputshowblurr:string=""
  // hiddenButton:boolean=true
  showButton:boolean=true;
  buttonText="submit"
  UserForm!: FormGroup;
  getDatas:User[]=[] ;
  public id: number | any;
  // employees:Emp []=[]

  constructor(private ds:DataService,private fb:FormBuilder,private ts:ToastrService){
    this.UserForm=this.fb.group({
      id:'',
      name:'',
      country:'',
      age:''

    })
  }

  ngOnInit(): void {
    this.getAllDatas();
   
  }

  title = 'CRUD';

  getAllDatas(){
    this.ds.getAllData().subscribe((res:User[])=>{
this.getDatas=res
console.log(this.getDatas);


    })
  }
  save(){
    this.ds.addData(this.UserForm.value).subscribe(()=>{
      this.ts.success("User registration","user added successfully")
      this.getAllDatas();
    })
  }


  deleteUser(id:any){
  {
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  this.ds.DeleteUser(id).subscribe(()=>{
    this.ts.success("User registration","user deleted successfully"),
    this.getAllDatas();
  })
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your imaginary file is safe :)",
      icon: "error"
    });
  }
});
  }









    
  
  }
  GetUserById(id:number){
this.showButton=false
    this.ds.getUserById(id).subscribe(u=>{
      console.log("uu",u)
      this.UserForm.patchValue({
      id:u.id,
      name:u.name,
      country:u.country,
      age:u.age

      })
    })
   
  
  }
  UpdateUserData(){
    this.ds.updateUser(this.UserForm.value).subscribe((u=>{
      this.ts.success("Registration User","User Updated successfully");
      this.getAllDatas();
      this.UserForm.reset();
      this.showButton=true

    }))
  }
view(id:number){
this.showButton=false
this.getAllDatas();
this.ds.getUserById(id).subscribe(u=>{
  console.log("uu",u)
  this.UserForm.patchValue({
  id:u.id,
  name:u.name,
  country:u.country,
  age:u.age

  })
})

  this.inputshowblurr="inputshow";
  this.hiddenView=true

}
 }

