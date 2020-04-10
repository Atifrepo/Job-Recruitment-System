export function parseCode(statusCode) {
    if(statusCode === '1.1'){
        return "Looking for Applicant";
    }else if(statusCode === '1.2'){
        return "In Progress";
    }else if(statusCode === '1.3'){
        return "Complete";
    }else if(statusCode === '2.1'){
        return "Applied";
    }else if(statusCode === '2.2'){
        return "In Progress";
    }else if(statusCode === '2.3'){
        return "Denied";
    }else if(statusCode === '2.4'){
        return "Complete";
    }

}
