export const BASE_URL = "http://localhost:3333/api";

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
