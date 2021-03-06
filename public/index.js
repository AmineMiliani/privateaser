'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];
/*
function Step1(events,bars){
  for(var i = 0; i < events.lenght; i++)
  {
    var bar_index = 0;
    for (var j = 0; j < bars.lenght; j++)
    {
      if(bars[j].id == events[i].barId)
      {
        bar_index = j;
      }
    }
    events[i].price = (events[i].persons * bars[bar_index].pricePerPerson)+ (events[i].time * bars[bar_index].pricePerHour);
  }
}
*/
function BookingPrice(){
  var barObj = ParseJsonArray(bars);
  var eventObj = ParseJsonArray(events);
  for(var i = 0 ; i<barObj.length;i++)
  {
    for(var j = 0; j < eventObj.length; j++){
      if(eventObj[i].barId == barObj[j].id){
        eventObj[i].price = eventObj[i].time * barObj[j].pricePerHour + eventObj[i].persons * barObj[j].pricePerPerson;
      }
    }
  }
  return eventObj;
}
function ParseJsonArray(array){
    var objectArray = new Array();
  for(var i = 0; i<array.length;i++)
  {
    objectArray[i] = JSON.parse(JSON.stringify(array[i]));
  }
  return objectArray;
}


function Step2(){
  var eventObj = BookingPrice();
  for(var i = 0; i < eventObj.lenght; i++)
  {
    if(eventObj[i].persons > 10 && eventObj[i].persons <= 20)
    {
      eventObj[i].price = eventObj[i].price * 0.9
    }
    if(eventObj[i].persons > 20 && eventObj[i].persons <= 30)
    {
      eventObj[i].price = eventObj[i].price * 0.8;
    }
    if(eventObj[i].persons > 30)
    {
      eventObj[i].price = eventObj[i].price * 0.7;
    }
  }
  return eventObj;
}


//const updatedArray = BookingPrice();
const updatedArray = Step2();
console.log(updatedArray);


//Step1(events, bars);
//console.log(bars);
//console.log(events);
//console.log(actors);
