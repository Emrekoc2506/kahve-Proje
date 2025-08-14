/*!const REGISTERED_USERS = 'registered_users'; // ❗ 'registred' yazım hatası düzeltilmiş
const ACTIVE_USER = 'active_user'; // ❗ Eksik tanım eklendi

export interface IUserModel {
    username: string;
    Email: string;
    password: string;
}

const addNewUser = (user: IUserModel) => {
    const userStr = localStorage.getItem(REGISTERED_USERS) || '[]';
    const users = JSON.parse(userStr) as IUserModel[];
    users.push(user);
    localStorage.setItem(REGISTERED_USERS, JSON.stringify(users));
    // ✅ Yeni kullanıcıyı kayıtlı dizisine ekler ve localStorage'a kaydeder
};

const isUserAlreadyRegistred = (username: string): boolean => {
    const userStr = localStorage.getItem(REGISTERED_USERS) || null;
    if (userStr == null) return false;

    const users = JSON.parse(userStr) as IUserModel[];
    const foundUser = users.find(x => x.username === username);
    return foundUser !== undefined;
    // ❗ 'null' yerine 'undefined' kontrolü kullanılır, çünkü find() bulunamazsa undefined döner
};

const getUser = (username: string, password: string): IUserModel | null => {
    const userStr = localStorage.getItem(REGISTERED_USERS) || null;
    if (userStr == null) return null;

    const users = JSON.parse(userStr) as IUserModel[];
    const foundUser = users.find(x => x.username === username && x.password === password);
    return foundUser || null;
    // Hem username hem password eşleşen kullanıcıyı döndürür
};

const updateActiveUser = (user: IUserModel) => {
    localStorage.setItem(ACTIVE_USER, JSON.stringify(user));
    // ❗ 'locelStorge' ve 'JSON.stringift' yazım hataları düzeltildi
};

const getActiveUser = () => {
    const activeUser = localStorage.getItem(ACTIVE_USER) || null;
    if (activeUser == null) return null;

    return JSON.parse(activeUser)
};

const deleteActiveUser = () => {
    localStorage.removeItem(ACTIVE_USER);
};
const getUserByUsername = (username: string): IUserModel | null => {
    const userStr = localStorage.getItem(REGISTERED_USERS);
    if (!userStr) return null;

    const users = JSON.parse(userStr) as IUserModel[];
    const foundUser = users.find(user => user.username === username);
    return foundUser || null;
};


export {
    addNewUser,
    isUserAlreadyRegistred,
    getUser,
    getUserByUsername,
    getActiveUser,
    updateActiveUser,
    deleteActiveUser
};*/