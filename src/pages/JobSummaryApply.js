import React, {Component} from 'react';
import ContactList from "../Components/ContactList";
import Divider from "@material-ui/core/Divider";
import TaskDetails_detail from "../TaskDetails_detail";
import {auth, database} from "../firebase";

class JobSummaryApply extends Component {
    constructor() {
        super();
        this.state = {
            firebase: '',
            task_data: null,
            applicant_data: null,
            loading: true
        }

    }

    componentDidMount() {
        let task_ref = database.ref("task/" + this.props.match.params.id);
        let app_ref = database.ref("task");
        task_ref.on("value", (snapshot) => {
            let item = snapshot.val();
            if(item){
                this.setState({task_data: item, loading: false});
            }
            console.log(item);
        });
    }

    render() {
        const data = this.state.task_data;
        console.log(data);
        return this.state.loading || data===null? (<div>Loading</div>) : (
            //import jon detail
            <div>
                <div align={'left'}>
                    <h3>&nbsp;&nbsp;My Application Summary</h3>
                    <ul>
                        <li>Job Name: {data.title}</li>
                        <li>Status: {data.status}</li>
                        <li>Applied On: {data.apply_date}</li>
                        <li>Expire Date: {data.expire_date}</li>
                    </ul>
                </div>
                <Divider/>
                {this.props.match.params.id == 1 ?
                    <div>
                        <ContactList/>
                        <Divider/>
                    </div>
                    : <div/>
                }
                <Divider/>
                <TaskDetails_detail id={this.props.match.params.id}/>
                <Divider/>
            </div>

        );
    }

}

export default JobSummaryApply;
