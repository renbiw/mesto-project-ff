const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-42",
  headers: {
    authorization: "4baeca36-0e67-4bf5-a839-8080e6cb541f",
    "Content-Type": "application/json",
  },
};

// получить данные карточки
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(
      `Ошибка при получении данных карточки: ${res.status}`
    );
  });
}

// получить данные о пользователе
export function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Ошибка при получении данных пользователя: ${res.status}`
    );
  });
}

// отправить данные о пользователе
export function patchUser(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(
        `Ошибка при отправке данных пользователя: ${res.status}`
      );
    }
    return res.json();
  });
}

// удалить карточку с сервера
export function deleteDataCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (!res.ok)
      return Promise.reject(`Ошибка удаления карточки: ${res.status}`);
    return res.json();
  });
}

export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (!res.ok) return Promise.reject(`Ошибка лайка: ${res.status}`);
    return res.json();
  });
}

export function unlikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (!res.ok) return Promise.reject(`Ошибка дизлайка: ${res.status}`);
    return res.json();
  });
}

export function changeAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка при изменении аватара: ${res.status}`);
    }
    return res.json();
  });
}

export function postCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка при создании карточки: ${res.status}`);
    }
    return res.json();
  });
}
