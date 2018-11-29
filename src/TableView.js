import React,{Component} from 'react'
class TableView extends Component{
    constructor(){
       super();

    }
    getlist(){
                //Every index of array has an instance of myInfo object.
      return (
      this.props.fields.map((item,index)=>{
        return <tr key={index} >
            <td>{item.fName}</td>
            <td>{item.lName}</td>
            <td>{item.e_mail}</td>
            <td>{item.password}</td>
            <td>{item.cPassword}</td>
        </tr>
      })
     )
    }

render(){
 return (
<div>
  <table>
    <tr>
        <th>
            First Name
        </th>
        <th>
            Last Name
        </th>
        <th>
            E-mail
        </th>
        <th>
            Password
        </th>
        <th>
            Last Name
        </th>
    </tr>
    {this.getlist()}
  </table>
  
</div>
)
 }


}
export default TableView;