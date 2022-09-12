// https://api.vokko.cloud/swagger/index.html

export interface Event {
    id:	string;
    eventDateAndTime: Date;
    title: string | null;
    motions: Motion[];
}

export function isFutureEvent(e: Event): boolean {
    return (e.eventDateAndTime >= new Date());
}

export function isPastEvent(e: Event): boolean {
    return (new Date(e.eventDateAndTime.getTime() + 7_200_000) <= new Date());
}

export interface Motion {
    id:	string;
    votingTitle: string;
    description: string | null;
    ownerId: string | null;
    startDate: Date;
    endDate: Date;
    timeout: number;
    options: VotingOption[];
}

export interface VotingOption {
    votingOptionId: string;
    title: string;
}

export const allEvents: Event[] = [
    {
        "id": "b3d3c93c-dac3-4a7a-8b8a-1a219ed46b3d",
        "eventDateAndTime": new Date(2022, 8, 12, 17, 30), //("2022-09-09T20:30:05.8834731+00:00"),
        "title": "HEC Alumni GeneralMeeting 2022",
        "motions": [
            {
                "id": "db961a27-f4df-4faa-9f9d-90fa0686d289",
                "endDate": new Date(2022,9,9,20,32,5),
                "options": [
                    {
                        "title": "Yes",
                        "votingOptionId": "430786a7-9c28-4bda-bf23-227e34149fa2"
                    },
                    {
                        "title": "No",
                        "votingOptionId": "9901bfcb-a9dd-4064-b9b1-171e78e9cf9b"
                    },
                    {
                        "title": "Abstain",
                        "votingOptionId": "3474dac3-175f-4ee5-8505-10b40d7614b1"
                    }
                ],
                "ownerId": null,
                "startDate": new Date(2022,9,9,20,30,5),
                "votingTitle": "Minutes 2021",
                "timeout": 0,
                "description": null
            },
            {
                "id": "db961a27-f4df-4faa-9f9d-90fa0686d289",
                "endDate": new Date(2022,9,9,20,34,5),
                "options": [
                    {
                        "title": "Yes",
                        "votingOptionId": "87f8a056-bdf3-487e-aac3-dfdbae065703"
                    },
                    {
                        "title": "No",
                        "votingOptionId": "1dbae040-6a2e-40d7-87cd-33540e58eff7"
                    },
                    {
                        "title": "Abstain",
                        "votingOptionId": "9961c030-2b7a-4b80-a4c5-d8efe57274eb"
                    }
                ],
                "ownerId": null,
                "startDate": new Date(2022,9,9,20,32,5),
                "votingTitle": "Statement 2021",
                "timeout": 0,
                "description": null
            },
            {
                "id": "db961a27-f4df-4faa-9f9d-90fa0686d289",
                "endDate": new Date(2022,9,9,20,20,36,5),
                "options": [
                    {
                        "title": "Yes",
                        "votingOptionId": "08431b4a-8c86-4d7f-8361-05f5008ddf0f"
                    },
                    {
                        "title": "No",
                        "votingOptionId": "98ea8dce-d5ab-43e6-87b3-77df785d5567"
                    },
                    {
                        "title": "Abstain",
                        "votingOptionId": "3bdd80be-4f7f-4f55-ae20-48ee454db869"
                    }
                ],
                "ownerId": null,
                "startDate": new Date(2022,9,9,20,34,5),
                "votingTitle": "Budget 2023",
                "timeout": 0,
                "description": null
            },
            {
                "id": "db961a27-f4df-4faa-9f9d-90fa0686d289",
                "endDate": new Date(2022,9,9,20,38,5),
                "options": [
                    {
                        "title": "Eric Olombel",
                        "votingOptionId": "fbefdb02-f1bb-4fde-af2a-9a09ecf16752"
                    },
                    {
                        "title": "Jonathan Rejaud",
                        "votingOptionId": "f5483519-a830-4e68-ad25-0e8b9594677e"
                    },
                    {
                        "title": "Walter Raaflaub",
                        "votingOptionId": "afc6b92e-fb0e-472c-952b-6e37e84b108f"
                    },
                ],
                "ownerId": null,
                "startDate": new Date(2022,9,9,20,36,5),
                "votingTitle": "Presidential Election",
                "timeout": 0,
                "description": null
            }
        ]
    },
    {
        "id": "ffd3c93c-dac3-4a7a-8b8a-1a219ed46b3f",
        "eventDateAndTime": new Date(2021, 9, 9, 20, 30), //("2022-09-09T20:30:05.8834731+00:00"),
        "title": "HEC Alumni GeneralMeeting 2021",
        "motions": [
            {
                "id": "db961a27-f4df-4faa-9f9d-90fa0686d289",
                "endDate": new Date(2022,9,9,20,38,5),
                "options": [
                    {
                        "title": "Eric Olombel",
                        "votingOptionId": "fbefdb02-f1bb-4fde-af2a-9a09ecf16752"
                    },
                    {
                        "title": "Jonathan Rejaud",
                        "votingOptionId": "f5483519-a830-4e68-ad25-0e8b9594677e"
                    },
                    {
                        "title": "Walter Raaflaub",
                        "votingOptionId": "afc6b92e-fb0e-472c-952b-6e37e84b108f"
                    },
                ],
                "ownerId": null,
                "startDate": new Date(2022,9,9,20,36,5),
                "votingTitle": "Presidential Election",
                "timeout": 0,
                "description": null
            }
        ]
    }
];


export const futureEvents = allEvents.filter(e => isFutureEvent(e));
export const currentEvents = allEvents.filter(e => (!isFutureEvent(e)) && (!isPastEvent(e)));
export const pastEvents = allEvents.filter(e => isPastEvent(e));

