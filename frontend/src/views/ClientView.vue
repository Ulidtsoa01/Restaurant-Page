<!----------Template----------->
<template>
  <!-- <div v-if="signedIn"> -->
    <div>
    <!--Top-->
    <v-container class="Top">
      <v-row v-for="j in justify" :key="j" :justify="j">
        <v-col v-for="k in 1" :key="k">
          <v-col>
            <v-img src="./images/pom.png" width="300"></v-img>
          </v-col>
        </v-col>
        <right>
        <v-col v-for="k in 1" :key="k">
          <!--ColorBlind mode button-->
          <v-switch v-model="singleExpand" label="Colorblind Mode"></v-switch>
        </v-col>
      </right>
      </v-row>
    </v-container>

    <!--Middle-->
    <v-container class="Mid">
      <v-row v-for="j in justify" :key="j" :justify="j">
        <!--Left side-->
        <v-col v-for="k in 1" :key="k">
          <v-navigation-drawer color="#grey" permanent width="180" mini-variant-width="120" expand-on-hover app>
            <br>
            <br>
            <p1 class="yourOrder">
              Your order:
              <br>
            </p1>
            <br>
            <v-card class="pa-2">
              <p1 v-for="k in entrees_array" :key="k" class="Entree">
                {{ k.name }}
                <br>
              </p1>
              <p1 v-for="k in toppings_array" :key="k" class="topping">
                - {{ k.name }}
                <br>
              </p1>
            </v-card>
            <br>
            <p1>
              Total: $
              {{ sub_total.toFixed(2) }}
            </p1>
            <br></br>
            <center>
              <v-btn @click="deleteAllItem('clear')" small color="red">Clear</v-btn>
              <br><br>
              <v-btn @click="calculate_cart_total(), addItem(), getData('Add Your Next Item!')" small color="#4174D9">
                Add to cart</v-btn>
              <br><br>
              <p1>
                Your cart: $
                {{ cart_total.toFixed(2) }}
              </p1>
              <v-card class="pa-2">
                <v-btn @click.prevent="move()" small color="#4174D9">Checkout</v-btn>
              </v-card>
            </center>

          </v-navigation-drawer>

          <!--tip buttons-->
          <v-card class="pa-2">
            <v-col>
              <h1>
                STEP 1.
              </h1>
              <p1>
                Choose your entree or drink
              </p1>
              <br><br>

              <v-row>
                <a v-for="k in mainEntrees_all" :key="k">
                  <v-card outlined class="ma-10" width="300" :disabled="!isDisabled_entrees"
                    @click="click_entrees(k.name), enable_all_buttons(k.name), enable_entree_buttons()">
                    <a v-if="k.name === 'Gyros'">
                      <v-img src="./images/Gyros.jpg" height="180px"></v-img>
                    </a>
                    <a v-else-if="k.name === 'Bowls'">
                      <v-img src="./images/Bowls.jpeg" height="180px"></v-img>
                    </a>
                    <a v-else-if="k.name === 'Hummus & Pita'">
                      <v-img src="./images/Hummus.jpeg" height="180px"></v-img>
                    </a>
                    <a v-else-if="k.name === 'Two Falafels'">
                      <v-img src="./images/Falafels.jpg" height="180px"></v-img>
                    </a>
                    <a v-else-if="k.name === 'Drink'">
                      <v-img src="./images/Drink.jpeg" height="180px"></v-img>
                    </a>

                    <div class="text-center">
                      <h2>
                        {{ k.name }}
                      </h2>
                      <v-card-subtitle>
                        $ {{ k.price }}
                        <br>
                        Calories: {{ k.calories }}
                        <br>
                        <a v-if="k.name === 'Gyros' || k.name === 'Bowls'">
                          1 protein & 4 toppings
                        </a>
                      </v-card-subtitle>
                    </div>
                  </v-card>
                </a>
              </v-row>
            </v-col>
          </v-card>
          <br>

          <v-card class="pa-2" inlined tile>
            <v-col>
              <h1>
                STEP 2.
              </h1>
              <p2>
                Choose 1 protein
              </p2>
              <br><br>

              <v-row>
                <!-- mainProtein -->
                <a v-for="k in mainProteins_all2" :key="k">
                  <v-card outlined class="ma-10" width="200"
                    @click="click_proteins(k.name), disable_mainProteins_buttons(), enable_subProteins_buttons()"
                    :disabled="!isDisabled_mainProteins">

                    <div class="text-center">
                      <h2>
                        {{ k.name }}
                      </h2>

                      <v-card-subtitle>
                        $ {{ k.price }}
                        <br>
                        Calories: {{ k.calories }}
                      </v-card-subtitle>
                    </div>
                  </v-card>
                </a>

                <!-- subProtein -->
                <a v-for="k in subProteins_all" :key="k">
                  <v-card outlined class="ma-10" width="200"
                    @click="click_subProteins(k.name), disable_subProteins_buttons()"
                    :disabled="!isDisabled_subProteins">

                    <div class="text-center">
                      <h2>
                        {{ k.name }}
                      </h2>

                      <v-card-subtitle>
                        $ {{ k.price }}
                        <br>
                        Calories: {{ k.calories }}
                      </v-card-subtitle>
                    </div>
                  </v-card>
                </a>
              </v-row>
            </v-col>
          </v-card>
          <br>

          <v-card class="pa-2" inlined tile>
            <v-col>
              <h1>
                STEP 3.
              </h1>
              <p2>
                Choose 3 toppings & 1 sauce
              </p2>
              <br><br>

              <v-row>
                <!-- topping -->
                <a v-for="k in toppings_all" :key="k">
                  <v-card outlined class="ma-10" width="200" @click="click_toppings(k.name), enable_toppings_button(e)"
                    :disabled="!isDisabled">

                    <div class="text-center">
                      <h2>
                        {{ k.name }}
                      </h2>

                      <v-card-subtitle>
                        $ {{ k.price }}
                        <br>
                        Calories: {{ k.calories }}
                      </v-card-subtitle>
                    </div>
                  </v-card>
                </a>
              </v-row>
            </v-col>
          </v-card>
          <br>

          <!--Subtotal, tip, and total-->
          <center>
            <v-card class="pa-2" inlined tile width="1200">
              <v-col>
                <h2 class="font-weight-bold" @click="calculate_subTotal">
                  Subtotal: {{ sub_total.toFixed(2) }}
                </h2>
              </v-col>
            </v-card>
          </center>
        </v-col>

      </v-row>
    </v-container>

  </div>
  <!-- <div v-else>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col>
          <p class="text-h1" style="text-align: center; padding-top: 20%">
            Not Signed In
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div> -->

</template>
<!----------Template----------->

<!-----------Script------------>
<script>

// import HelloWorld from '../components/HelloWorld'
import { loadGoogle, userSignedIn } from '../js/login.js';

import { getItems, getLatestOrderId } from '../js/backend.js'
import { getLatestToppingUUID } from '../js/backend.js'
import { getLatestItemUUID } from '../js/backend.js'
import { insertOrder } from '../js/backend.js'
import { insertOrderItems } from '../js/backend.js'
import { insertOrderToppings } from '../js/backend.js'
import { getIdFromName } from '../js/backend.js'
import { incrementInventory } from '../js/backend.js'
import { getItemsFromCategory } from '../js/backend.js'
import { getToppings } from '../js/backend.js'

export default {
  // for checkout





  data: () => ({
    signedIn: false,
    cart_total: 0,
    total: 0,
    sub_total: 0,
    show: false,
    dialog: false,
    dialogDelete: false,
    count: -1,
    enable_toppings: false,
    enable_entrees: true,
    enalbe_mainProteins: false,
    enable_subProteins: false,
    enable_delete: false,
    tip: 0,

    calories_total: 0,
    tip1: false,
    tip2: false,
    tip3: false,
    tip4: false,
    light_mode: false,
    dark_mode: true,
    flag_delete: false,
    topping_count: 0,

    subProtein_count: 0,

    latestOrderID: 0,
    latestToppingUUID: 0,
    latestItemUUID: 0,

    // Layout
    justify: [
      'space-between',
    ],

    // Table
    headers: [
      {
        text: 'Item Number',
        align: 'start',
        sortable: false,
        value: 'number',
      },
      { text: 'Name', value: 'name' },
      { text: 'Price', value: 'price' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],

    items: [],

    order: [],

    entrees_array: [],

    toppings_array: [],

    editedIndex: -1,

    editedItem: {
      number: 0,
      name: '',
      price: 0.0
    },

    defaultItem: {
      number: 0,
      name: '',
      price: 0.0
    },

    all_items: [],
    mainEntrees_all: [],
    mainEntrees_name: [],
    subEntrees_name: [],
    subEntrees_all: [],
    mainProteins_name: [],
    mainProteins_all: [],
    mainProteins_all2: [],
    subProteins_name: [],
    subProteins_all: [],
    toppings_name: [],
    toppings_all: [],

  }), // data end

  // computed
  computed: {
    calculate_subTotal() {
      let sum = 0;
      for (let i = 0; i < this.items.length; i++) {
        sum += this.items[i].price;
      }
      this.sub_total_track = sum;
      return this.sub_total = sum;
    },

    isDisabled() {
      return this.enable_toppings;
    },

    isDisabled_mainProteins() {
      return this.enalbe_mainProteins;
    },

    isDisabled_subProteins() {
      return this.enable_subProteins;
    },

    isDisabled_entrees() {
      return this.enable_entrees;
    },

    isDisabled_delete() {
      return this.enable_delete;
    },

    calculate_total() {
      let sum = 0;
      for (let i = 0; i < this.items.length; i++) {
        sum += this.items[i].price;
      }
      this.total = (sum + this.tip).toFixed(2);
      return (sum + this.tip).toFixed(2);
    },

    calculate_total_calories() {
      return this.calories_total;
    },
  },



  // watch
  watch: {
  },


  // methods
  methods: {
    clickList() {
      this.$router.push({
        path: "ClickList",
        query: { sub_total: sub_total }
      })
    },

    move() {
      this.$router.push({
        path: 'checkout',
        query: {
          sub_total: this.sub_total,
          toppings_array: this.toppings_array,
          entrees_array: this.entrees_array,
        },
      })
    },

    calculate_cart_total() {
      this.cart_total += this.sub_total;
    },

    // Entrees buttons
    click_entrees(e) {
      for (let i = 0; i < this.mainEntrees_all.length; i++) {
        if (e === this.mainEntrees_all[i].name) {
          this.count_update();
          this.calories_total += this.mainEntrees_all[i].calories;
          this.items.push({
            number: this.count,
            name: this.mainEntrees_all[i].name,
            price: this.mainEntrees_all[i].price,
          })
        }
      }
      this.entrees_array.push({
        number: this.count,
        name: e,
      });
      this.order.push({
        number: this.count,
        name: e,
      });
      this.flag_delete = false;
    },

    count_update() {
      if (this.count > -1) {
        this.count = this.items[this.items.length - 1].number + 1;
      }
      else {
        this.count += 1;
      }
    },

    // Proteins buttons
    click_proteins(e) {
      if (this.flag_delete) {
        for (let i = 0; i < this.mainProteins_all.length; i++) {
          if (e === this.mainProteins_all[i].name) {
            this.calories_total += this.mainProteins_all[i].calories;
            this.items.splice(this.editedIndex, 0, {
              number: this.items[this.editedIndex - 1].number,
              name: this.mainProteins_all[i].name,
              price: this.mainProteins_all[i].price,
            })
          }
        }
        this.toppings_array.push({
          number: this.items[this.editedIndex - 1].number,
          name: e,
        });
      }
      else {
        for (let i = 0; i < this.mainProteins_all.length; i++) {
          if (e === this.mainProteins_all[i].name) {
            this.calories_total += this.mainProteins_all[i].calories;
            this.items.push({
              number: this.count,
              name: this.mainProteins_all[i].name,
              price: this.mainProteins_all[i].price,
            })
          }
        }
        this.toppings_array.push({
          number: this.count,
          name: e,
        });
        this.order.push({
          number: this.count,
          name: e,
        });
      }
      this.flag_delete = false;
    },

    click_subProteins(e) {
      if (this.flag_delete) {
        for (let i = 0; i < this.mainProteins_all.length; i++) {
          if (e === this.mainProteins_all[i].name) {
            this.calories_total += this.mainProteins_all[i].calories;
            this.items.splice(this.editedIndex, 0, {
              number: this.items[this.editedIndex - 1].number,
              name: this.mainProteins_all[i].name,
              price: this.mainProteins_all[i].price,
            })
          }
        }
        this.toppings_array.push({
          number: this.items[this.editedIndex - 1].number,
          name: e,
        });
      }
      else {
        for (let i = 0; i < this.mainProteins_all.length; i++) {
          if (e === this.mainProteins_all[i].name) {
            this.calories_total += this.mainProteins_all[i].calories;
            this.items.push({
              number: this.count,
              name: this.mainProteins_all[i].name,
              price: this.mainProteins_all[i].price,
            })
          }
        }
        this.toppings_array.push({
          number: this.count,
          name: e,
        });
        this.order.push({
          number: this.count,
          name: e,
        });
      }
      this.flag_delete = false;
      this.subProtein_count += 1;
    },

    // Toppings buttons
    click_toppings(e) {
      if (this.flag_delete) {
        for (let i = 0; i < this.toppings_all.length; i++) {
          if (e === this.toppings_all[i].name) {
            this.calories_total += this.toppings_all[i].calories;
            this.items.splice(this.editedIndex, 0, {
              number: this.items[this.editedIndex - 1].number,
              name: this.toppings_all[i].name,
              price: this.toppings_all[i].price,
            })
          }
        }
        this.toppings_array.push({
          number: this.items[this.editedIndex - 1].number,
          name: e,
        });
        let count = 4;
        count -= 1;
        this.enable_toppings_button(count)
      }
      else {
        for (let i = 0; i < this.toppings_all.length; i++) {
          if (e === this.toppings_all[i].name) {
            this.calories_total += this.toppings_all[i].calories;
            this.items.push({
              number: this.count,
              name: this.toppings_all[i].name,
              price: this.toppings_all[i].price,
            })
          }
        }
        this.toppings_array.push({
          number: this.count,
          name: e,
        });
        this.order.push({
          number: this.count,
          name: e,
        });
      }
      this.flag_delete = false;
      this.topping_count += 1;
      this.enable_toppings_button(this.topping_count);
    },

    enable_toppings_button(e) {
      if (this.topping_count > 3) {
        this.enable_toppings = false;
      }
      else {
        this.enable_toppings = true;
      }
    },

    async enable_all_buttons(k) {
      let array = await getItemsFromCategory('mainEntree');
      for (let i = 0; i < array.length; i++) {
        if (k === array[i].name) {
          this.enable_toppings = true;
          this.enalbe_mainProteins = true;
          this.enable_subProteins = false;
        }
      }
    },

    enable_entree_buttons(k) {
      this.enable_entrees = false;

      if (k === 1) {
        this.enable_entrees = true;
      }
    },

    disable_mainProteins_buttons(k) {
      this.enalbe_mainProteins = false;
    },

    enable_subProteins_buttons() {
      this.enable_subProteins = true;
    },

    disable_subProteins_buttons() {
      this.enable_subProteins = false;
    },

    addItem() {
      this.enable_toppings = false;
      this.enable_entrees = true;
      this.enalbe_mainProteins = false;
      this.enable_subProteins = false;
      this.flag_delete = false;
      this.topping_count = 0;

      // this.items.push({
      //   number: this.count,
      //   name: '',
      //   price: 0,
      // });
    },

    async deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      this.flag_delete = true
      let mainEntrees_flag = false;

      for (let d = 0; d < this.toppings_all.length; d++) {
        if (item.name === this.toppings_all[d].name) {
          this.topping_count -= 1;
          this.enable_toppings_button(this.topping_count);
        }
      }

      // check_buttons(item);

      // check if item is one of the mainEntrees items
      for (let i = 0; i < this.mainEntrees_all.length; i++) {
        if (item.name === this.mainEntrees_all[i].name) {
          this.count -= 1;
          this.enable_entrees = true;
          this.enalbe_mainProteins = false;
          this.enable_subProteins = false;
          this.enable_toppings = false;
          this.flag_delete = false;
          mainEntrees_flag = true;
        }
      }

      // if mainEntrees item was removed, remove all proteins and toppings
      var q = 0;
      var r = 0;
      var s = 0;

      if (mainEntrees_flag) {
        while (q < this.items.length) {
          if (this.items[q].number === item.number) {
            this.remove_calories(this.items[q].name);
            this.remove_count(this.items[q].name);
            this.items.splice(q, 1);
          }
          else {
            ++q;
          }
        }
        while (r < this.toppings_array.length) {
          if (this.toppings_array[r].number === item.number) {
            this.toppings_array.splice(r, 1);
          }
          else {
            ++r;
          }
        }
        // splice from entrees_array
        for (let t = 0; t < this.entrees_array.length; t++) {
          if (item.name === this.entrees_array[t].name &&
            item.number === this.entrees_array[t].number) {
            this.entrees_array.splice(t, 1);
          }
        }
      }
      else {
        this.items.splice(this.editedIndex, 1)
        this.remove_calories(item.name);
        // splice from toppings_array
        for (let g = 0; g < this.toppings_array.length; g++) {
          if (item.name === this.toppings_array[g].name &&
            item.number === this.toppings_array[g].number) {
            this.toppings_array.splice(g, 1);
          }
        }

        // enable mainProteins and disable subProteins buttons
        let array = await getItemsFromCategory('mainProtein')
        for (let j = 0; j < array.length; j++) {
          if (item.name === array[j].name) {
            this.enalbe_mainProteins = true;
            this.enable_subProteins = false;
          }
        }

        // enable subProteins button
        for (let m = 0; m < this.subProteins_all.length; m++) {
          if (item.name === this.subProteins_all[m].name) {
            this.enable_subProteins = true;
          }
        }
      }
    },

    remove_count(e) {
      for (let i = 0; i < this.toppings_all.length; i++) {
        if (e === this.toppings_all[i].name) {
          this.topping_count -= 1;
        }
      }
    },

    remove_calories(e) {
      for (let i = 0; i < this.all_items.length; i++) {
        if (e === this.all_items[i].name) {
          this.calories_total -= this.all_items[i].calories;
        }
      }
    },

    async make_all_items() {
      this.all_items = await getItems();

      let array2 = await getItemsFromCategory('mainProtein');
      for (let p = 0; p < this.subProteins_all.length; p++) {
        array2.push(this.subProteins_all[p]);
      }
      for (let o = 0; o < this.toppings_all.length; o++) {
        array2.push(this.toppings_all[o]);
      }

      for (let u = 0; u < array2.length; u++) {
        this.all_items.push(array2[u]);
      }
    },

    deleteAllItem(e) {
      if (e == 'clear') {
        for (let i = this.items.length; i >= 0; i--) {
          this.items.pop(i)
        }
        this.entrees_array = [];
        this.toppings_array = [];
        this.count = -1;
        this.enalbe_mainProteins = false;
        this.enable_subProteins = false;
        this.enable_toppings = false;
        this.enable_entrees = true;
        this.tip = 0;
        this.total = 0;
        this.sub_total = 0;
        this.calories_total = 0;
        this.tip1 = false;
        this.tip2 = false;
        this.tip3 = false;
        this.tip4 = false;
        this.flag_delete = false;
        this.topping_count = 0;
        alert("Cleared!")
      }
      else {
        for (let i = this.items.length; i >= 0; i--) {
          this.items.pop(i)
        }
      }
    },

    getData(data) {
      alert(data)
    },

    light_mode_button() {
      this.$vuetify.theme.dark = false;
      this.dark_mode = false;
    },

    light_mode_button_outlined() {
      this.$vuetify.theme.dark = false;
      this.light_mode = true;
      this.dark_mode = false;
    },

    dark_mode_button() {
      this.$vuetify.theme.dark = true;
      this.light_mode = false;
    },

    dark_mode_button_outlined() {
      this.$vuetify.theme.dark = true;
      this.light_mode = false;
      this.dark_mode = true;
    },

    async getOrderID() {
      this.latestOrderID = await getLatestOrderId();
    },

    async getToppingUUID() {
      this.latestToppingUUID = await getLatestToppingUUID();
    },

    async getItemUUID() {
      this.latestItemUUID = await getLatestItemUUID();
    },

    async updateItems() {
      let a = await getItemsFromCategory("mainEntree");
      this.mainEntrees_name.splice(0);
      for (let i = 0; i < a.length; i++) {
        if (a[i].name != null) {
          this.mainEntrees_name.push(a[i].name);
        }
      }

      let b = await getItemsFromCategory("subEntree");
      this.subEntrees_name.splice(0);
      for (let j = 0; j < b.length; j++) {
        if (b[j].name != null) {
          this.subEntrees_name.push(b[j].name);
        }
      }

      let c = await getItemsFromCategory("mainProtein");
      this.mainProteins_name.splice(0);
      for (let n = 0; n < c.length; n++) {
        if (c[n].name != null) {
          this.mainProteins_name.push(c[n].name);
        }
      }

      let d = await getItemsFromCategory("subProtein");
      this.subProteins_name.splice(0);
      for (let m = 0; m < d.length; m++) {
        if (d[m].name != null) {
          this.subProteins_name.push(d[m].name);
        }
      }

      let e = await getItemsFromCategory("topping");
      this.toppings_name.splice(0);
      for (let u = 0; u < e.length; u++) {
        if (e[u].name != null) {
          this.toppings_name.push(e[u].name);
        }
      }
    },

    async insertOrderTable() {
      await insertOrder(this.latestOrderID + 1, this.calories_total, this.sub_total, this.tip, this.total, this.current_time);

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

      let d = 1;
      if (this.toppings_array != []) {
        for (let j = 0; j < this.toppings_array.length; j++) {
          let id_toppings = await getIdFromName(this.toppings_array[j].name);
          await insertOrderToppings(this.latestToppingUUID + d, this.latestOrderID + 1, this.toppings_array[j].number, id_toppings, this.toppings_array[j].name);
          let inventory_id_toppings = await getIdFromName(this.toppings_array[j].name);
          await incrementInventory(inventory_id_toppings);
          d += 1;
        }
      }
      this.entrees_array = [];
      this.toppings_array = [];
      this.count = -1;
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
      this.tip1 = false;
      this.tip2 = false;
      this.tip3 = false;
      this.tip4 = false;
      this.flag_delete = false;
      this.topping_count = 0;
    },

    async getItemInfo() {
      this.mainEntrees_all = await getItems();
      this.mainProteins_all = await getItemsFromCategory('mainProtein');
      this.subProteins_all = await getItemsFromCategory('subProtein');
      for (let i = 0; i < this.subProteins_all.length; i++) {
        this.mainProteins_all.push(this.subProteins_all[i]);
      }
      this.mainProteins_all2 = await getItemsFromCategory('mainProtein');
      this.toppings_all = await getItemsFromCategory('topping');
    }
  },

  async created() {
    await this.updateItems();
    await this.getItemInfo();
    await this.make_all_items();
    await loadGoogle();
    this.signedIn = await userSignedIn(this.$route.params.credential);
  },

  async mounted() {
    await this.getOrderID();
    await this.getToppingUUID();
    await this.getItemUUID();
    await this.getIdFromName();
  },

}

</script>
<!-----------Script------------>


<!-----------Style------------->
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
</style>
<!-----------Style------------->