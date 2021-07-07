 function createEmployeeRecord(dataArray){
     const newEmployee = {}
     newEmployee.firstName = dataArray[0]
     newEmployee.familyName = dataArray[1]
     newEmployee.title = dataArray[2]
     newEmployee.payPerHour = dataArray[3]
     newEmployee.timeInEvents = []
     newEmployee.timeOutEvents = []
     return newEmployee
 }

 function createEmployeeRecords(dataArray){
     const empRecords = dataArray.map(createEmployeeRecord)
     return empRecords;
 }

 function createTimeInEvent(empRecord, dateStamp){
     const date = dateStamp.split(' ')[0]
     const hour = parseInt(dateStamp.split(" ")[1], 10)
     empRecord.timeInEvents.push({type: 'TimeIn',
                                    hour: hour,
                                    date: date})
    return empRecord
}

function createTimeOutEvent(empRecord, dateStamp){
    const date = dateStamp.split(' ')[0]
    const hour = parseInt(dateStamp.split(" ")[1], 10)
    empRecord.timeOutEvents.push({type: 'TimeOut',
                                   hour: hour,
                                   date: date})
   return empRecord
}

function hoursWorkedOnDate(emp, date){
    let timeIn = 0
    let timeOut = 0
    emp.timeInEvents.forEach((timeInEvent => {
        if(timeInEvent.date === date){
            timeIn = timeInEvent.hour
        }
    }))
    emp.timeOutEvents.forEach(timeOutEvent => {
        if(timeOutEvent.date === date){
            timeOut = timeOutEvent.hour
        }
    })
    return (timeOut - timeIn)/100;
}

function wagesEarnedOnDate(emp, date){
    return emp.payPerHour * hoursWorkedOnDate(emp, date)
}

function allWagesFor(emp){
    return emp.timeInEvents.reduce((acc, curr) => {
        return acc + wagesEarnedOnDate(emp, curr.date)
    }, 0)
}

function calculatePayroll(empRecords){
    return empRecords.reduce((acc, curr) => {
        return acc + allWagesFor(curr)
    }, 0)
}

function findEmployeeByFirstName(scrArray, name){
    let foundEmp;
    scrArray.forEach( (empRecord) =>{
        if(empRecord.firstName === name){
            foundEmp = empRecord
        }
    })
    return foundEmp
}