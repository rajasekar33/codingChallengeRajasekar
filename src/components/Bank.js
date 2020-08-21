import React, { Component } from 'react';

import '../containers/userForm/Login.css';
import Input from './UI/input/Input';
import Button from './UI/Button/Button';

class Bank extends Component {
    state = {
        orderForm: {
            bank: {
                label: 'Bank',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'hdfc', displayValue: 'HDFC'},
                        {value: 'kvb', displayValue: 'KVB'},
                        {value: 'idbi', displayValue: 'IDBI'},
                    ]
                },
                value: 'hdfc',
                validation: {
                    required: true,
                },
                valid: true,
            },
            amount: {
                elementType: 'input',
                label: 'amount',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Enter amount'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            }
        },
        formIsValid: false,
        loading: false,
        alert: null
    }

    bankHandler = (event) => {

        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        console.log(this.props, "inside dashboard")
        if(!this.props.user){
            return
        }
        let userAccount = this.props.user.account.filter(res => {
            if(res.bank === formData.bank){
                return true
            }
            return false
        })

        if(userAccount.length === 0){
            this.setState({alert: "You dont have an account in this bank"})
            return
        }

        const bank = userAccount[0]
        if(formData.amount > bank.balance){
            this.setState({alert: "insufficient balance"})
            return
        }
        this.props.withdraw(formData)
        

    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid, alert: null});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.bankHandler}>
                {formElementsArray.map(formElement => {                    
                    if(formElement.config.isHidden){
                        return null;
                    }

                    return <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Get Cash</Button>
            </form>
        );
       
        return (
            <div className="ContactData">
                <h2>Bank Details</h2>
                {this.state.alert && <span style={{color: 'red'}}>{this.state.alert}</span>}
                {form}
            </div>
        );
    }

}

export default Bank;