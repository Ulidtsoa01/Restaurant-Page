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
                    <v-card class="pa-2" width="600">
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
                    <p1 class="payment">Select a payment method below to continue with your order.</p1>
                    <br><br>
                    <v-card class="pa-2" width="600">
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



                </v-col>
                <!-- right -->
                <v-col v-for="k in 1" :key="k">
                    <br><br>
                    <center>
                        <h1>Your Order</h1>
                    </center>
                    <br>
                    <v-card class="pa-10">
                        <p1 v-for="k in entrees_array" :key="k" class="Entree">
                            {{ k.name }}
                            <br>
                        </p1>
                        <p1 v-for="k in toppings_array" :key="k" class="topping">
                            - {{ k.name }}
                            <br>
                        </p1>
                    </v-card>
                    <br><br>
                    <v-card class="pa-10" inlined tile>
                        <v-row>
                            <v-col>
                                <p1 class='Entree'>
                                    Subtotal:
                                </p1>
                            </v-col>
                            <right>
                                <v-col>
                                    $ {{ sub_total }}
                                </v-col>
                            </right>
                        </v-row>
                        <v-row>
                            <v-col>
                                <p1 class='Entree'>
                                    Tax:
                                </p1>
                            </v-col>
                            <right>
                                <v-col>
                                    $ {{ tax.toFixed(2) }}
                                </v-col>
                            </right>
                        </v-row>
                        <v-row>
                            <v-col>
                                <p1 class='Entree'>
                                    Order Total:
                                </p1>
                            </v-col>
                        </v-row>
                        <br>
                        <center>
                            <v-btn 
                            :loading="loading"
                            :disabled="loading"
                            @click="deleteAllItem('order'), insertOrderTable()"
                                color="#42a376">Place Order</v-btn>
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
// import HelloWorld from '../components/HelloWorld'

export default {
    name: 'ClientCheckoutView',

    components: {
        //HelloWorld,
    },

    data: () => ({
        sub_total: 0,
        tax: 0,
        toppings_array: [],
        entrees_array: [],

        justify: [
            'space-between',
        ],
    }),

    computed: {
        calculate_tax() {
            this.tax = this.sub_total * 0.00625;
            return this.tax;
        }
    },

    created() {
        this.sub_total = this.$route.query.sub_total;
        this.toppings_array = this.$route.query.toppings_array;
        this.entrees_array = this.$route.query.entrees_array;
        this.calculate_tax();
    },

    methods: {
        move() {
            this.$router.push({
                path: 'client',
            })
        },

        getData(data) {
            alert(data)
        },
    }



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
</style>
