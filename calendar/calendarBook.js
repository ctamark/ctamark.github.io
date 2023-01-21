

let gDispSelDateStr = ''
let gSelDateStr = ''

function onClickDate(seldate){
	
	let month_idx = gCalendarBook.curMonth
	
	console.log('onClickDate ' + (month_idx+1) +"." + seldate)
	
    var currentMonthDate = document.querySelectorAll('.dates .current');
	currentMonthDate.forEach( (elmt, idx)=>{
	
      elmt.classList.remove('selectday')
	
	})
	
	gSelDateStr = (month_idx+1) + "." + seldate 
	
	gDispSelDateStr = gCalendarBook.curYear +"."+ (month_idx+1) + "." + seldate 
	
    currentMonthDate[seldate -1].classList.add('selectday');		
		
}


class calendarBook {
	
	constructor(){
		
		this.curYear;
		this.curMonth
		
		this.dispDate;
		
		this.today

  
	}
	
	
	init(){
				
    // 날짜 정보 가져오기
    var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
	
    let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
	
	this.today = today 
     
    var curDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체
      
    var currentYear = curDate.getFullYear(); // 달력에서 표기하는 연
    var currentMonth = curDate.getMonth(); // 달력에서 표기하는 월
    var currentDate = curDate.getDate(); // 달력에서 표기하는 일

    // kst 기준 현재시간
    // console.log(thisMonth);
	
	 this.curMonth = currentMonth
	 this.curYear = currentYear

     this.draw(curDate)
		
	}
	
	//=================
	draw(dispDate){
				
	   // 렌더링을 위한 데이터 정리
      let  currentYear = dispDate.getFullYear();
      let  currentMonth = dispDate.getMonth();
      let  currentDate = dispDate.getDate();

        // 이전 달의 마지막 날 날짜와 요일 구하기
        var startDay = new Date(currentYear, currentMonth, 0);
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();

        // 이번 달의 마지막날 날짜와 요일 구하기
        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        // console.log(prevDate, prevDay, nextDate, nextDay);

        // 현재 월 표기
		
		let yearMonthElmt = document.querySelector('.year-month') 
		yearMonthElmt.innerText = currentYear + '.' + (currentMonth + 1);		
      //  $('.year-month').text(currentYear + '.' + (currentMonth + 1));


        // 렌더링 html 요소 생성
      let  calendar = document.querySelector('.dates')
       calendar.innerHTML = '';
        
        // 지난달
        for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
        }
        // 이번달 nextDate(마지막 날짜) 
        for (var i = 1; i <= nextDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day current" onclick="onClickDate(' + i + ')">' + i + '</div>'
					
		
        }
        // 다음달
        for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
        }

        let today = this.today

        // 오늘 날짜 표기
        if (today.getMonth() == currentMonth) {
            let todayDate = today.getDate();
            var currentMonthDate = document.querySelectorAll('.dates .current');
            currentMonthDate[todayDate -1].classList.add('today');
        }    
	
	}
	
	
	prevMonth(){
		
		console.log('prevMonth')
		
		this.dispDate = new Date(this.curYear, this.curMonth - 1, 1);
		
		this.curYear = this.dispDate.getFullYear();
		this.curMonth = this.dispDate.getMonth();
		
		this.draw(this.dispDate)
		
	}
	
	nextMonth(){

    console.log('nextMonth')
		
	  this.dispDate = new Date(this.curYear, this.curMonth + 1, 1);
	  this.curYear = this.dispDate.getFullYear();
	  this.curMonth = this.dispDate.getMonth();
		
	 
	  this.draw(this.dispDate)
		
	}
	
	
}