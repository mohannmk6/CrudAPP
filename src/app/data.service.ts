import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
URL="http://localhost:3000/";
  constructor(private http:HttpClient) { }

  getAllData():Observable<any>{
return this.http.get('http://localhost:3000/data');
  }
  addData(user:string){
    return this.http.post('http://localhost:3000/data',user);
  }
  getUserById(id:number):Observable<any>{

    return this.http.get(this.URL+"data/"+id)
  }
  DeleteUser(id:User){
    return this.http.delete(`http://localhost:3000/data/${id}`);
  }
  updateUser(user:User){
    console.log( "ddd",user)
    return this.http.put<User>(`http://localhost:3000/data/${user.id}`,user);
  }


}
