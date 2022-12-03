<template>
    <div>
        
        <v-container class="Top">
            <v-row v-for="j in justify" :key="j" :justify="j">
                <v-col v-for="k in 1" :key="k">
                    <br>
                    <v-btn @click.prevent="move()" small color="#4174D9">Add more Items</v-btn>
                </v-col>
                <right>
                    <v-col v-for="k in 1" :key="k">
                        <v-select
                            label="Choose language"
                            :items="langs"
                            @change="translateHandle"
                        ></v-select>
                    </v-col>
                    <v-col v-for="k in 1" :key="k">
                        <!--ColorBlind mode button-->
                        <v-switch v-model="singleExpand" label="Colorblind Mode"></v-switch>
                    </v-col>
                </right>
            </v-row>
        </v-container>

        <!-- <v-img src="./pom.png" width="300"></v-img> -->
        <v-container class="checkout">
            <v-row v-for="j in justify" :key="j" :justify="j">
                <!-- left -->
                <v-col v-for="k in 1" :key="k">

                    <br><br>
                    <h1>Guest Information</h1>
                    <br>
                    <v-card class="pa-2">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="message1" label="First Name" clearable></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="message1" label="Last Name" clearable></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="message1" label="Email" clearable></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="message1" label="Mobile Phone" clearable></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                    <br><br>
                    <h1>Payment Method</h1>
                    <p class="payment">Select a payment method below to continue with your order.</p>
                    <br><br>
                    <v-card class="pa-2">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="message1" label="Credit Card Number" clearable></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="message1" label="Exp. Date" clearable></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="message1" label="CVV" clearable></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="message1" label="Zip Code" clearable></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                    <br><br>
                    <v-card class="pa-2">
                        <AddGoogleMap/>
                    </v-card>



                </v-col>
                <!-- right -->
                <v-col v-for="k in 1" :key="k">
                    <br><br>
                    <center>
                        <h1>Your Order</h1>
                    </center>
                    <br>
                    <v-card class="pa-10">
                        <p v-for="k in entrees_array" :key="k" class="Entree">
                            {{ k.name }}
                            <br>
                        </p>
                        <p v-for="k in toppings_array" :key="k" class="topping">
                            - {{ k.name }}
                            <br>
                        </p>
                    </v-card>
                    <br><br>
                    <v-card class="pa-10" inlined tile>
                        <v-row>
                            <v-col>
                                <p class='Entree'>
                                    Subtotal:
                                </p>
                            </v-col>
                            <right>
                                <v-col>
                                    $ {{ sub_total }}
                                </v-col>
                            </right>
                        </v-row>
                        <!-- <v-row>
                            <v-col>
                                <p class='Entree'>
                                    Tax:
                                </p>
                            </v-col>
                            <right>
                                <v-col>
                                    $ {{ tax.toFixed(2) }}
                                </v-col>
                            </right>
                        </v-row>
                        <v-row>
                            <v-col>
                                <p class='Entree'>
                                    Order Total:
                                </p>
                            </v-col>
                            <right>
                                <v-col>
                                    $ {{ total.toFixed(2) }}
                                </v-col>
                            </right>
                        </v-row> -->
                        <br>
                        <center>
                            <v-btn @click="insertOrderTable()" color="#42a376">
                                <div class="ps">
                                Place Order
                            </div>
                            </v-btn>
                        </center>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>


        <!-- <v-btn @click.prevent="move()" small color="#4174D9">Add more Items</v-btn>
        <h1>Welcome</h1>
        {{ all_info }}
        {{ sub_total }}
        <br>
        {{ toppings_array }}
        <br>
        {{ entrees_array }} -->
    </div>
</template>

<script>
import moment from 'moment'
import { insertOrder } from '../js/backend.js'
import { insertOrderItems } from '../js/backend.js'
import { incrementInventory } from '../js/backend.js'
import { insertOrderToppings } from '../js/backend.js'
import { getItems, getLatestOrderId } from '../js/backend.js'
import { getLatestToppingUUID } from '../js/backend.js'
import { getLatestItemUUID } from '../js/backend.js'
import { getIdFromName } from '../js/backend.js'
import { translateAll, langs } from '../js/backend.js'
import AddGoogleMap from "../components/AddGoogleMap.vue";


export default {
    name: 'ClientCheckoutView',

    components: {
        AddGoogleMap,
    },

    data: () => ({
        langs: [],
        sub_total: 0,
        total: 0,
        tax: 0,
        tip: 0,
        latestOrderID: 0,
        latestItemUUID: 0,
        calories_total: 0,
        toppings_array: [],
        entrees_array: [],
        current_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),

        justify: [
            'space-between',
        ],
    }),

    watch: {
        loader() {
            const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false), 3000)

            this.loader = null


        },
    },

    computed: {
        calculate_tax() {
            this.tax = this.sub_total * 0.0625;
            return this.tax;
        },
        calculate_total() {
            this.total = this.sub_total + this.tax;
            return this.total;
        },
    },

    async created() {
        this.sub_total = this.$route.query.sub_total;
        this.toppings_array = this.$route.query.toppings_array;
        this.entrees_array = this.$route.query.entrees_array;
        this.calories_total = this.$route.query.calories_total;
        this.calculate_tax();
        this.calculate_total();
    },
    async mounted() {
        /*await translateAll('es');*/
        this.langs = langs;
    },

    methods: {
        async translateHandle(e) {
            await translateAll(e);
        },
        move() {
            this.$router.push('/client');
        },

        empty() {
            this.entrees_array = [];
        },

        async getOrderID() {
            this.latestOrderID = await getLatestOrderId();
        },

        async getItemUUID() {
            this.latestItemUUID = await getLatestItemUUID();
        },

        async insertOrderTable() {
            await insertOrder(this.latestOrderID + 1, this.calories_total, this.sub_total, this.tip, this.sub_total, this.current_time);

            let c = 1;
            if (this.entrees_array != []) {
                for (let i = 0; i < this.entrees_array.length; i++) {
                    let id_entrees = await getIdFromName(this.entrees_array[i].name);
                    await insertOrderItems(this.latestItemUUID + c, this.latestOrderID + 1, this.entrees_array[i].number, id_entrees, this.entrees_array[i].name);
                    let inventroy_id_entrees = await getIdFromName(this.entrees_array[i].name);
                    await incrementInventory(inventroy_id_entrees);
                    c += 1;
                }
            }

            // let d = 1;
            // if (this.toppings_array != []) {
            //     for (let j = 0; j < this.toppings_array.length; j++) {
            //         let id_toppings = await getIdFromName(this.toppings_array[j].name);
            //         await insertOrderToppings(this.latestToppingUUID + d, this.latestOrderID + 1, this.toppings_array[j].number, id_toppings, this.toppings_array[j].name);
            //         let inventory_id_toppings = await getIdFromName(this.toppings_array[j].name);
            //         await incrementInventory(inventory_id_toppings);
            //         d += 1;
            //     }
            // }
            // this.entrees_array.splice(0, this.entrees_array.length);
            this.empty();
            this.toppings_array = [];
            this.latestOrderID = await getLatestOrderId();
            this.latestItemUUID = await getLatestItemUUID();
            this.latestToppingUUID = await getLatestToppingUUID();
            this.enalbe_mainProteins = false;
            this.enable_subProteins = false;
            this.enable_toppings = false;
            this.enable_entrees = true;
            this.tip = 0;
            this.total = 0;
            this.sub_total = 0;
            this.calories_total = 0;
        },

    },

    async mounted() {
        await this.getOrderID();
        await this.getToppingUUID();
        await this.getItemUUID();
        await this.getIdFromName();
    },
}
</script>

<style>
.text-center {
    margin-top: 13px;
}

.yourOrder {
    font-weight: bold;
    font-size: 20px;
    align-items: left;
}

.Entree {
    font-weight: bold;
    font-size: 20px;
    align-items: left;
}

.topping {
    font-size: 13px;
}

.payment {
    color: grey;
}

.ps {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: bold;
}
</style>
