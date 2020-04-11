import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker'
import './signup.css';
import PostJobSuccess from "./PostJobSuccess";
import {auth, database} from './firebase';
import withAuthorization from "./withAuthorization";

class PostJob extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            myInfo: {
                title: null,
                phone: auth.currentUser.phoneNumber,
                e_mail: auth.currentUser.email,
                reward:0,
                startDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
                desc: null,
                postDate: new Date(new Date().getTime())
            },
            currentUser: {},
            fields: [],
            error: 'this is error'
        }


        this.userRef = database.ref('/users').child('Anonymous');

    }

    componentDidMount() {
        auth.onAuthStateChanged((currentUser) => {
            this.setState({currentUser: auth.currentUser || {}});
        });

    }


    inputChange(changeValue, event) {
        let info = this.state.myInfo;
        info[changeValue] = event.target.value;
        this.setState({
            myInfo: info
        });

    }

    handleDateChange(e, date) {
        let info = this.state.myInfo;
        info.startDate = date;
        this.setState({
            myInfo: info
        });
    }


    render() {
        return (
            <div>
                <form style={{'text-align': 'center'}}>
                    <TextField
                        name="Title"
                        hintText="Title"
                        floatingLabelText="Title"
                        defaultValue={this.state.myInfo.title}
                        onChange={this.inputChange.bind(this, "title")}
                        floatingLabelFixed
                    />
                    <br/>

                    <TextField
                        name="Phone"
                        hintText="Phone"
                        floatingLabelText="Phone"
                        defaultValue={this.state.myInfo.phone}
                        onChange={this.inputChange.bind(this, "phone")}
                        floatingLabelFixed
                    />
                    <br/>

                    <TextField
                        name="Email"
                        hintText="Email"
                        floatingLabelText="Email"
                        defaultValue={this.state.myInfo.e_mail}
                        onChange={this.inputChange.bind(this, "e_mail")}
                        floatingLabelFixed
                    />
                    <br/>
                    <TextField
                    name="Reward(Optional)"
                    hintText="$"
                    floatingLabelText="Reward(Optional)"
                    onChange={this.inputChange.bind(this, "reward")}
                    floatingLabelFixed
                />
                    <br/>
                    <DatePicker
                        name="Start Date"
                        hintText="Start Date"
                        floatingLabelText="Start Date"
                        //TODO: default set 7 days?
                        value={this.state.myInfo.startDate}
                        onChange={this.handleDateChange.bind(this)}
                        floatingLabelFixed
                    />
                    <br/>
                    <label className="mdc-text-field mdc-text-field--textarea">
                        <label className="mdc-floating-label" id="my-label-id">Please Describe Your Job and Your
                            Requirement</label>
                        <br/>
                        <textarea aria-labelledby="my-label-id" rows="10" cols="50"
                                  onChange={this.inputChange.bind(this, 'desc')}/>
                        <div className="mdc-notched-outline">
                            <div className="mdc-notched-outline__leading"/>
                            <div className="mdc-notched-outline__notch">
                            </div>
                            <div className="mdc-notched-outline__trailing"/>
                        </div>
                    </label>
                    <br/><br/>
                    <PostJobSuccess data={this.state.myInfo} title="Submit"/>
                    <br/><br/><br/><br/>
                </form>
            </div>

        )
    };
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)( PostJob);