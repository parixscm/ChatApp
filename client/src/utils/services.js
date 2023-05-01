export const BASE_URL = "http://localhost:5000/api";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await response.json();

  // 에러 체크
  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data?.message;
    } else {
      message = data;
    }

    return { error: true, message };
  }

  // 에러가 없으면
  return data;
};

export const getRequest = async url => {
  const response = await fetch(url);
  const data = await response.json();

  // 에러 체크
  if (!response.ok) {
    let message = "에러가 발생했습니다. 잠시 후에 시도해주세요";
    if (data?.message) {
      message = data.message;
    }

    return { error: true, message };
  }

  // 에러가 없으면
  return data;
};
