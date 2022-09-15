import {CreateUserResponseData} from "../api/model/create-user-response-data";
import {IUser} from "../api/model/iuser";
import axios from "axios";
import {GetAllUsersResponseDocument} from "../api/model/get-all-users-response-document";
import {CreateUserRequestData} from "../api/model/create-user-request-data";

export async function checkUserRegistration(user: IUser): Promise<CreateUserResponseData|null> {

    let cleanupCalled = false;

    let userRegistration: CreateUserResponseData|null = null;
    let registrationValid = false;
    const storedUserRegistration = window.localStorage.getItem('VOKKO_USER_REGISTRATION');
    console.log(`reading ${storedUserRegistration}`);

    if (!storedUserRegistration) {
        userRegistration = null;
    } else {
        userRegistration = JSON.parse(storedUserRegistration);

        // Pruefen, ob Registrierung vollstaendig ist
        if (!userRegistration?.privateKey) {
            userRegistration = null;
        }

        if (!userRegistration?.user?.userId) {
            userRegistration = null;
        }

        // Pruefen, ob Registrierung auf dieselbe E-Mail-Adresse lautet
        if (user.email !== userRegistration?.user?.email) {
            window.localStorage.removeItem('VOKKO_USER_REGISTRATION');
            userRegistration = null;
        }
    }

    if (userRegistration) {
        // Pruefen, ob der Benutzer im Backend existiert

        const userDocument = await axios.get<GetAllUsersResponseDocument>('jsonapi/v1/users');
        console.log('userDocument', userDocument);
        const userExists = userDocument?.data?.data?.find(u => u.userId === userRegistration?.user?.userId);
        console.log('userExists', userExists);

        if (!userExists) {
            userRegistration = null;
        }
    }

    if (!userRegistration && !cleanupCalled) {
        console.log('creating user', JSON.stringify(user));
        const createResponse = await axios.post<CreateUserResponseData>('jsonapi/v1/users', {
            data: {
                phoneIdentification: "",
                lastName: user.lastName,
                firstName: user.firstName,
                email: user.email
            }
        });
        console.log('createResponse', createResponse);
        userRegistration = createResponse.data;
        console.log('userRegistration', userRegistration);

        window.localStorage.setItem('VOKKO_USER_REGISTRATION', JSON.stringify(userRegistration));
    }

    return userRegistration;
}
