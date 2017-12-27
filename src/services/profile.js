import { http, headers } from './httpHelper'

export function getProfile() {
    return http('/user/profile/', headers());
}

export function updateProfile(payload) {
    return http.put('/user/profile/', payload, headers());
}

export function updatePassword(current, newPassword, repeatNew) {
    return http.put('/user/profile/password', 'current=' + current + '&new=' + newPassword + '&repeatNew=' + repeatNew, headers());
}
