import { LightningElement } from 'lwc';
import Personal_Number__c from '@salesforce/schema/Resignation__c.Personal_Number__c';
import Reason_for_resignation__c from '@salesforce/schema/Resignation__c.Reason_for_resignation__c';
import Personal_Email_ID from '@salesforce/schema/Resignation__c.Personal_Email_ID__c';
import confirm from '@salesforce/schema/Resignation__c.I_confirm_that_I_d_like_to_resign__c';
import IsResignationRecordExist from '@salesforce/apex/CreateResignationLWC.IsResignationRecordExist';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class Resignation extends LightningElement {

    isComponentVisible = false;
    isCardVisible = false;
    fields = [Personal_Number__c, Personal_Email_ID, Reason_for_resignation__c, confirm];

    connectedCallback(){
        console.log('Inside connector');
        this.onRefresh();
    }

    disconnectedCallback(){
        this.showNotification();
    }
 
    handleClick() {
        this.isCardVisible = true;
    }

    onRefresh(){
        IsResignationRecordExist()
        .then(result => {
            console.log('Test'+ result);
            this.isComponentVisible = result;
        })
        .catch(error => {
            console.log('Error');
        })
    }

    showNotification() {
        let event = new ShowToastEvent({
            title: 'Resignation request created Successfully',
            message: 'You will receive an Email'
        });
        this.dispatchEvent(event);
    }
    
}