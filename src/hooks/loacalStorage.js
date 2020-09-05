// setItem시 QUOTA_EXCEEDED_ERR : private browsing으로 막혀져 있음 OR 문자열 5메가 넘을시
// getitem시 지원하지 않을 경우 : 항상 null을 리턴
// 로컬스토리지에 저장
export function LocalStorageSet(key, value) {
    try {
        localStorage.setItem(key, value);
        //localStorage.setItem(key, data);
    } catch (e) {
        if (e.name.toLowerCase().indexOf("quotaexceed") > -1) {
            alert('입력할 수 있는 최대 글자수를 초과하였거나 개인정보 보호 브라우징 설정을 꺼주셔야 사용 가능합니다.');
            return false;
        }
        else {
            alert(e.name);
            return false;
        }
    }
}
export function LocalStorageSetArray(key, value, isUpdate, availCount) {
  if (!key || !value) { return; }

  let data = JSON.parse(localStorage.getItem(key)) || [];

  if (data.indexOf(value) > -1) return;
  
  if (!isUpdate) {
      //중복제거
      if (value && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
              if (JSON.stringify(data[i]) == JSON.stringify(value)) {
                  data.splice(i, 1);
              }
          }
      }

      if (data.length >= (availCount || 5)) { data.pop(); }
      data.unshift(value);
  }

  try {
      localStorage.setItem(key, JSON.stringify(data || value));
      //localStorage.setItem(key, data);
  } catch (e) {
      if (e.name.toLowerCase().indexOf("quotaexceed") > -1) {
          alert('입력할 수 있는 최대 글자수를 초과하였거나 개인정보 보호 브라우징 설정을 꺼주셔야 사용 가능합니다.');
          return false;
      }
      else {
          alert(e.name);
          return false;
      }
  }
}

// 로컬스토리지에서 불러오기
export function LocalStorageGet(key) {
    let value = localStorage.getItem(key);

    if (!value) { return; }

    if (value[0] == "[" || value[0] == "{") { value = JSON.parse(value); }

    return value;
}
// 로컬스토리지에서 데이터 삭제
export function LocalStorageDel(val) {
  try {
      localStorage.removeItem(val);
  } catch (e) {
      if (e.name.toLowerCase().indexOf("quotaexceed") > -1) {
          alert('입력할 수 있는 최대 글자수를 초과하였거나 개인정보 보호 브라우징 설정을 꺼주셔야 사용 가능합니다.');
          return false;
      }
      else {
          alert(e.name);
          return false;
      }
  }
}
// 로컬스토리지에서 키에 대한 특정 값 삭제
export function LocalStorageDelValue(key, value) {
  try {
      let values = LocalStorageGet(key);

      $.each(values, function (i, val) {
          if (val.key == value) {
              values.splice(i, 1);
              return false;
          }
      });

      return JSON.stringify(values);
      /*localStorage.removeItem(key);

      if ($.isArray(values) && values[0]) {
          localStorage.setItem(key, JSON.stringify(values));
      }*/
  }
  catch (e) {
      if (e == QUOTA_EXCEEDED_ERR)
          alert('개인정보 보호 브라우징 설정을 꺼주셔야 해당 메뉴를 사용 가능합니다.');
      return false;
  }
}
// 로컬스토리지에서 특정 Object name에 대한 값 삭제
export function LocalStorageDelObject(key, name, value) {
  try {
      let values = LocalStorageGet(key);

      $.each(values, function (i, val) {
          if (val[name] == value) {
              values.splice(i, 1);
              return false;
          }
      });

      if ($.isArray(values) && values[0]) {
          localStorage.setItem(key, JSON.stringify(values));
      }
      else {
          localStorage.removeItem(key);
      }
  }
  catch (e) {
      if (e == QUOTA_EXCEEDED_ERR)
          alert('개인정보 보호 브라우징 설정을 꺼주셔야 해당 메뉴를 사용 가능합니다 .');
      return false;
  }
}
