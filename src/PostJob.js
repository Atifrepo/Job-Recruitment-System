import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import './signup.css';
import PostJobSuccess from "./PostJobSuccess";

class PostJob extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            myInfo: {
                fName: '',
                lName: '',
                e_mail: '',
                password: '',
                cPassword: '',
                country: '',
                city: '',
                Contact_Number: '',
                Passport_Number: '',
                NIC_Number: '',
                type: '',
                expireDate: ''
            },
            fields: [],
            error: 'this is error'
        }
    }

    componentDidMount() {
        console.log("Login Data is here ", this.props.location.data)
    }

    inputChange(changeValue, event) {

        this.state.myInfo[changeValue] = event.target.value;
        console.log('event', event.target.value);
        this.setState({
            myInfo: this.state.myInfo
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
                        value={this.state.myInfo.Name}
                        onChange={this.inputChange.bind(this, "Name")}
                        floatingLabelFixed
                    />
                    <br/>

                    <TextField
                        name="Phone"
                        hintText="Phone"
                        floatingLabelText="Phone"
                        value={this.state.myInfo.phone}
                        onChange={this.inputChange.bind(this, "Phone")}
                        floatingLabelFixed
                    />
                    <br/>

                    <TextField
                        name="e_mail"
                        hintText="e_mail"
                        floatingLabelText="e_mail"
                        value={this.state.myInfo.e_mail}
                        onChange={this.inputChange.bind(this, "e_mail")}
                        floatingLabelFixed
                    />
                    <br/>
                    <TextField
                        name="expireDate"
                        hintText="expireDate"
                        floatingLabelText="expireDate"
                        value={this.state.myInfo.expireDate}
                        onChange={this.inputChange.bind(this, "expireDate")}
                        floatingLabelFixed
                    />
                    <br/>
                    <label className="mdc-text-field mdc-text-field--textarea">
                        <label className="mdc-floating-label" id="my-label-id">Please Describe Your Job and Your
                            Requirement</label>
                        <br/>
                        <textarea aria-labelledby="my-label-id" rows="6" cols="30"/>
                        <div className="mdc-notched-outline">
                            <div className="mdc-notched-outline__leading"/>
                            <div className="mdc-notched-outline__notch">
                            </div>
                            <div className="mdc-notched-outline__trailing"/>
                        </div>
                    </label>
                    <br/><br/>
                    <PostJobSuccess title="Submit" link="/jobSummary/1"/>
                </form>
            </div>

        )
    };
}

export default PostJob