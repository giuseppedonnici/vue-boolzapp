
/*
Il compito è di svolgere la milestone 1:
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto.
Consigli del giorno:
- scegliete con attenzione gli strumenti che utilizzerete;
- tenete in mente le funzionalità che dovranno essere implementate nei giorni successive. La struttura realizzata mi faciliterà rendere il 
tutto dinamico? Forse mi serve una classe per distinguere i messaggi innviati da quelli ricevuti?
*/

const {createApp} = Vue;

// per comodità salvo la libreria luxon in una variabile
const dt = luxon.DateTime;
console.log(dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS));

const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || "";
createApp({
    data() {
        return {
            activeIndex: 0,
            nameToCheck: '',
            isMessageActive: false,
            messageIndex: 0,
            newMessage: {
                message: '',
                date: this.getNowDate(),
                status: 'sent'
            },
            replyMessage: {
                message: 'ok',
                date: this.getNowDate(),
                status: 'received'
            },
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]
        }
    },
    methods: {
        // per gestire il contatto attivo
        activeContact(index) {
            this.activeIndex = index;
        },
        
        // per gestire il messaggio da pushare come "inviato" e relativa risposta dopo 1 secondo
        messageToPush() {
            if(this.newMessage.message != '') {
                this.contacts[this.activeIndex].messages.push(this.newMessage);
                this.newMessage = {
                    message: '',
                    date: this.getNowDate(),
                    status: 'sent'
                };
                const dialogIndex = this.activeIndex;
                setTimeout(() => {
                    this.responseMessage(dialogIndex);
                }, 1000);
            }
        },

        // funzione che genera il messaggio di risposta 
        responseMessage(dialogIndex) {
            this.contacts[dialogIndex].messages.push(this.replyMessage);
        },
        
        // controlla che il primo campo non sia vuoto, setta la visibilità di tutti i contatti a false e imposta true 
        // solo a quelli che contengono le lettere digitate dall'utente
        check(nameToCheck) {
            if(nameToCheck[0] != ' ') {
                this.contacts.forEach(contact => {
                    contact.visible = false;
                    if(contact.name.includes(capitalize(nameToCheck))) {
                        contact.visible = true;
                    }
                });
            }
        },

        // funzione che mi serve per estrapolare l'orario dal formato data che gli passo
        getDateTime(dateStr) {
            const myDate = dt.fromFormat(dateStr, "dd/MM/yyyy HH:mm:ss");
            return myDate.toLocaleString(dt.TIME_24_SIMPLE);
        },

        // funzione di comodità per prendere la data in questo momento
        getNowDate() {
            return dt.now().toFormat("dd/MM/yyyy HH:mm:ss");
        },

        // funzione per gestire la visualizzazione delle opzioni sul singolo messaggio
        showOptions(clickedIndex) {
            this.messageIndex = clickedIndex,
            this.isMessageActive = !this.isMessageActive;
        },

        // funzione che mi permette di eliminare il messaggio attivo
        deleteMessage(indexToRemove) {
            this.contacts[this.activeIndex].messages.splice(indexToRemove, 1);
            this.isMessageActive = false;
        },

        // funzione che mi permette di prendere l'ultimo messaggio dell'array di messaggi (se ce ne sono)
        getLastMessage(index) {
            const messages = this.contacts[index].messages;
            if(messages.length > 0) {
                let lastMessage = messages[messages.length - 1].message;
                if(lastMessage.length > 20) {
                    lastMessage = lastMessage.substring(0,20) + "...";
                }
                return lastMessage;
            } else {
                return "Non hai ancora messaggi";
            }
        },

        // funzione che mi permettere di prendere l'orario dell'ultimo messaggio dell'array di messaggi (se ce ne sono)
        getLastMessageHour(index) {
            const messages = this.contacts[index].messages;
            if(messages.length > 0) {
                let lastMessageHour = messages[messages.length - 1].date;
                return lastMessageHour;
            }
        }
    }
}).mount('#app')