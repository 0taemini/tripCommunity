// 세션 스토리지 설정
const storage = window.sessionStorage;

/*
  특정 select의 option 내용을 업데이트 하는 함수
   - select: select 객체
   - type: select의 타입으로 시도 | 구군 | 읍면동
   - data: 표현할 데이터 [{key, label}]
*/
const updateSelect = (select, type, data) => {
	select.innerHTML = `<option value="" selected disabled>${type} 선택</option>`;
	if (data) {
		data.forEach((element) => {
			select.innerHTML += `<option value="${element.key}">${element.label}</option>`;
		});
	}
};


/*
get 방식으로 fetch 처리하기 위한 함수
 - url: 요청 url
 - param: 요청 parameter
 - isXml: 요청 방식이 xml 인지 여부
*/
const getFetch = async (url, param, isXml) => {
	try {
		const queryString = new URLSearchParams(param).toString();
		const response = await fetch(url + "?" + queryString);
		let result = "";
		if (isXml) {
			result = await response.text();
		} else {
			result = await response.json();
		}
		console.log("요청 URL: " + url, param, result);
		return result;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

/*
  post 방식으로 fetch 처리하기 위한 함수
  - url: 요청 url
  - data: 요청 data
*/
const postFetch = async (url, data) => {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});
		if (!response.ok) throw new Error("Fetch 실패");
		const result = await response.json();
		console.log("요청 URL: " + url, data, result);
		return result;
	} catch (e) {
		console.error("POST 요청 오류", e);
		throw e;
	}
};
