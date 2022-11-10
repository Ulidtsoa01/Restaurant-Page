<!----------Comment----------->

<!----------Template----------->
<template>
  <div>
    <!--Top-->
    <v-container class="Top">
      <v-row v-for="j in justify" :key="j" :justify="j">
        <v-col v-for="k in 1" :key="k">
          <!--Server button-->
          <v-btn elevation="5" color="warning">Server View</v-btn>

          <!-- Debugging Part
          {{ entrees_array }}
          {{ toppings_array }}
          {{ calories_total }} -->
          <!-- {{ subEntrees_name }}
          {{ mainProteins_name }}
          {{ subProteins_name }}
          {{ total }}
          <br></br>
          <br></br>
          {{ sub_total }}
          <br></br>
          {{ entrees_array }}
          <br></br>
          {{ toppings_array }}
          {{ latestOrderID }}

          {{ calories_total }} -->

          <!-- {{ current_time}} -->

          <!-- {{calories_total}}
          {{moment(new Date()).format('YYYY-DD-MM h:mm:ss')}}  -->

          <!--Manager button-->
          <router-view :key="$route.fullPath"></router-view>
          <router-link :to="{ path: '/manager' }" style="text-decoration: none; color: inherit;">
            <v-btn elevation="5" class="ma-2" outlined color="orange">Manager View</v-btn>
          </router-link>
        </v-col>
        <right>
          <v-col v-for="k in 1" :key="k">
            <!--ColorBlind mode button-->
            <v-btn v-if="isLightMode" @click="light_mode_button" elevation="5" class="ma-2" color="green">
              Light Mode
            </v-btn>
            <v-btn v-if="!isLightMode" @click="light_mode_button_outlined" elevation="5" class="ma-2" outlined
              color="green">
              Light Mode
            </v-btn>
            <v-btn v-if="isdarkMode" @click="dark_mode_button" elevation="5" class="ma-2" color="green">
              Dark Mode
            </v-btn>
            <v-btn v-if="!isdarkMode" @click="dark_mode_button_outlined" elevation="5" class="ma-2" outlined
              color="green">
              Dark Mode
            </v-btn>
          </v-col>
        </right>
      </v-row>
    </v-container>

    <!--Middle-->
    <v-container class="Mid">
      <v-row v-for="j in justify" :key="j" :justify="j">
        <!--Left side-->
        <v-col v-for="k in 1" :key="k">
          <!--Clock-->
          <vue-clock />
          <!--Update button-->
          &nbsp;&nbsp;
          <v-btn @click="updateItems(), getData('Updated!'), deleteAllItem('clear')" elevation="5" class="ma-1"
            color="green" dark large>Update
          </v-btn>
          &nbsp;&nbsp;
          <!--Order table-->
          <br>
          <v-data-table :headers="headers" :items="items" sort-by="" class="elevation-1">
            <template v-slot:top>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </template>

            <!--Delete button-->
            <template v-slot:item.actions="{ item }">
              <v-btn depressed color="error" small @click="deleteItem(item)">
                DELETE
              </v-btn>
            </template>
          </v-data-table>

          <!--Add, order, clear buttons-->
          <center>
            <v-card class="pa-2" inlined tile>
              <v-btn large elevation="5" rounded color="green" dark class="mb-2"
                @click="addItem(), getData('Add Your Next Item!')">
                Add
              </v-btn>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-btn large elevation="5" rounded
                @click="getData('Order Placed!'), deleteAllItem('order'), insertOrderTable()" class="mb-2"
                color="orange" dark>Order
              </v-btn>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-btn large elevation="5" rounded color="primary" dark class="mb-2"
                @click.native="deleteAllItem('clear')">
                clear
              </v-btn>
            </v-card>
          </center>

          <!--tip buttons-->
          <center>
            <br>
            <v-card class="pa-2" inlined tile>
              <v-col>
                <h2>
                  Tip:
                  <v-btn v-if="dark_mode" @click="tip_control(1)" elevation="8" class="ma-2" outlined color="orange">5%
                  </v-btn>
                  <v-btn v-if="light_mode" @click="tip_control(1)" elevation="1" class="ma-2" depressed color="warning">
                    5%
                  </v-btn>
                  <v-btn v-if="dark_mode" @click="tip_control(2)" elevation="8" class="ma-2" outlined color="orange">10%
                  </v-btn>
                  <v-btn v-if="light_mode" @click="tip_control(2)" elevation="1" class="ma-2" depressed color="warning">
                    10%</v-btn>
                  <v-btn v-if="dark_mode" @click="tip_control(3)" elevation="8" class="ma-2" outlined color="orange">15%
                  </v-btn>
                  <v-btn v-if="light_mode" @click="tip_control(3)" elevation="1" class="ma-2" depressed color="warning">
                    15%</v-btn>
                  <v-btn v-if="dark_mode" @click="tip_control(4)" elevation="8" class="ma-2" outlined color="orange">20%
                  </v-btn>
                  <v-btn v-if="light_mode" @click="tip_control(4)" elevation="1" class="ma-2" depressed color="warning">
                    20%</v-btn>
                  &nbsp;
                </h2>
              </v-col>
            </v-card>
          </center>
          <br>

          <!--Subtotal, tip, and total-->
          <center>
            <v-card class="pa-2" inlined tile>
              <v-col>
                <h2 class="font-weight-bold" @click="calculate_subTotal">
                  Subtotal: {{ sub_total.toFixed(2) }}
                </h2>
                <br>
                <h2 class="font-weight-bold">
                  Tip:
                </h2>
                <h2 class="font-weight-bold" v-if="istip1">
                  {{ calculate_tip_1.toFixed(2) }} (5%)
                </h2>
                <h2 class="font-weight-bold" v-else-if="istip2">
                  {{ calculate_tip_2.toFixed(2) }} (10%)
                </h2>
                <h2 class="font-weight-bold" v-else-if="istip3">
                  {{ calculate_tip_3.toFixed(2) }} (15%)
                </h2>
                <h2 class="font-weight-bold" v-else-if="istip4">
                  {{ calculate_tip_4.toFixed(2) }} (20%)
                </h2>
                <br>
                <h2 class="font-weight-bold">
                  Total: {{ calculate_total }}
                </h2>
              </v-col>
              <br>
              <!--Pom & honey image-->
              <v-col>
                <v-img src="./pom.png" width="300"></v-img>
              </v-col>
            </v-card>
          </center>
        </v-col>

        <!--Right side-->
        <v-col v-for="k in 1" :key="k">
          <!--Entrees / Drinks-->
          <center>
            <br><br>
            <v-row no-gutters>
              <v-col v-for="n in 1" :key="n" :cols="n === 2 ? 5 : undefined">
                <v-card class="pa-2" inlined tile>
                  <h2 class="font-weight-bold">
                    Entrees / Drinks
                  </h2>
                  <!--mainEntrees / subEntrees buttons-->
                  <div class="ma-2">
                    <a v-for="k in mainEntrees_name" :key="k">
                      <v-btn v-if="dark_mode" @click="click_entrees(k), enable_all_buttons(k), enable_entree_buttons()"
                        :disabled="!isDisabled_entrees" elevation="10" class="ma-3" outlined color="orange" large>
                        {{ k }}
                      </v-btn>
                      <v-btn v-if="light_mode" @click="click_entrees(k), enable_all_buttons(k), enable_entree_buttons()"
                        :disabled="!isDisabled_entrees" elevation="5" class="ma-3" depressed color="warning" large>
                        {{ k }}
                      </v-btn>
                    </a>
                    <a v-for="k in subEntrees_name" :key="k">
                      <v-btn v-if="dark_mode" @click="click_entrees(k), enable_all_buttons(k), enable_entree_buttons(1)"
                        :disabled="!isDisabled_entrees" elevation="10" class="ma-3" outlined color="orange" large>
                        {{ k }}
                      </v-btn>
                      <v-btn v-if="light_mode"
                        @click="click_entrees(k), enable_all_buttons(k), enable_entree_buttons(1)"
                        :disabled="!isDisabled_entrees" elevation="5" class="ma-3" depressed color="warning" large>
                        {{ k }}
                      </v-btn>
                    </a>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </center>

          <br>

          <!--Proteins-->
          <center>
            <v-row no-gutters>
              <v-col v-for="n in 1" :key="n" :cols="n === 2 ? 5 : undefined">
                <v-card class="pa-2" inlined tile>
                  <h2 class="font-weight-bold">
                    Proteins
                  </h2>
                  <!--mainProteins / subProteins buttons-->
                  <div class="ma-2">
                    <a v-for="k in mainProteins_name" :key="k">
                      <v-btn v-if="dark_mode"
                        @click="click_proteins(k), disable_mainProteins_buttons(), enable_subProteins_buttons()"
                        :disabled="!isDisabled_mainProteins" elevation="10" class="ma-3" outlined color="orange" large>
                        {{ k }}
                      </v-btn>
                      <v-btn v-if="light_mode"
                        @click="click_proteins(k), disable_mainProteins_buttons(), enable_subProteins_buttons()"
                        :disabled="!isDisabled_mainProteins" elevation="5" class="ma-3" depressed color="warning" large>
                        {{ k }}
                      </v-btn>
                    </a>
                    <a v-for="k in subProteins_name" :key="k">
                      <v-btn v-if="dark_mode" @click="click_proteins(k), disable_subProteins_buttons()"
                        :disabled="!isDisabled_subProteins" elevation="10" class="ma-3" outlined color="orange" large>
                        {{ k }}
                      </v-btn>
                      <v-btn v-if="light_mode" @click="click_proteins(k), disable_subProteins_buttons()"
                        :disabled="!isDisabled_subProteins" elevation="5" class="ma-3" depressed color="warning" large>
                        {{ k }}
                      </v-btn>
                    </a>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </center>

          <br>

          <!--Toppings-->
          <center>
            <v-row no-gutters>
              <v-col v-for="n in 1" :key="n" :cols="n === 2 ? 5 : undefined">
                <v-card class="pa-2" inlined tile>
                  <h2 class="font-weight-bold">
                    Toppings
                  </h2>
                  <!--toppings buttons-->
                  <div class="ma-2">
                    <a v-for="k in toppings_name" :key="k">
                      <v-btn v-if="dark_mode" @click="click_toppings(k)" :disabled="!isDisabled" elevation="10"
                        class="ma-3" outlined color="orange" large>
                        {{ k }}
                      </v-btn>
                      <v-btn v-if="light_mode" @click="click_toppings(k)" :disabled="!isDisabled" elevation="5"
                        class="ma-3" depressed color="warning" large>
                        {{ k }}
                      </v-btn>
                    </a>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </center>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<!----------Template----------->

<!-----------Script------------>
<script>
// Clock import
import moment from 'moment'
import VueClock from '@dangvanthanh/vue-clock';

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
  data: () => ({
    dialog: false,
    dialogDelete: false,
    count: -1,
    enable_toppings: false,
    enable_entrees: true,
    enalbe_mainProteins: false,
    enable_subProteins: false,
    tip: 0,
    sub_total: 0,
    total: 0,
    calories_total: 0,
    tip1: false,
    tip2: false,
    tip3: false,
    tip4: false,
    light_mode: false,
    dark_mode: true,
    current_time: moment(new Date()).utc().format('YYYY-DD-MM hh:mm:ss'),

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

    mainEntrees_all: [],
    mainEntrees_name: [],
    subEntrees_name: [],
    subEntrees_all: [],
    mainProteins_name: [],
    mainProteins_all: [],
    subProteins_name: [],
    subProteins_all: [],
    toppings_name: [],
    toppings_all: [],

  }), // data end

  // computed
  computed: {

    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },

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

    istip1() {
      return this.tip1;
    },

    istip2() {
      return this.tip2;
    },

    istip3() {
      return this.tip3;
    },

    istip4() {
      return this.tip4;
    },

    isdarkMode() {
      return this.dark_mode;
    },

    isLightMode() {
      return this.light_mode;
    },

    calculate_tip_1() {
      let sum = 0;
      for (let i = 0; i < this.items.length; i++) {
        sum += this.items[i].price;
      }
      this.tip = sum * 0.05
      return this.tip;
    },

    calculate_tip_2() {
      let sum = 0;
      for (let i = 0; i < this.items.length; i++) {
        sum += this.items[i].price;
      }
      this.tip = sum * 0.10;
      return this.tip;
    },

    calculate_tip_3() {
      let sum = 0;
      for (let i = 0; i < this.items.length; i++) {
        sum += this.items[i].price;
      }
      this.tip = sum * 0.15;
      return this.tip;
    },

    calculate_tip_4() {
      let sum = 0;
      for (let i = 0; i < this.items.length; i++) {
        sum += this.items[i].price;
      }
      this.tip = sum * 0.20;
      return this.tip;
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

    ee() {

    }




  },

  // watch
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  // Clock
  components: { VueClock },

  // methods
  methods: {
    // Entrees buttons
    click_entrees(e) {
      for (let i = 0; i < this.mainEntrees_all.length; i++) {
        if (e === this.mainEntrees_all[i].name) {
          this.count++;
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
    },

    // Proteins buttons
    click_proteins: function (e) {
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
    },

    // Toppings buttons
    click_toppings: function (e) {
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
    },

    tip_control(k) {
      if (k === 1) {
        this.tip1 = true;
        this.tip2 = false;
        this.tip3 = false;
        this.tip4 = false;
      }
      else if (k === 2) {
        this.tip1 = false;
        this.tip2 = true;
        this.tip3 = false;
        this.tip4 = false;
      }
      else if (k === 3) {
        this.tip1 = false;
        this.tip2 = false;
        this.tip3 = true;
        this.tip4 = false;
      }
      else if (k === 4) {
        this.tip1 = false;
        this.tip2 = false;
        this.tip3 = false;
        this.tip4 = true;
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

      let empty_array = [{
        number: '',
        name: '',
        price: 0,
      }];
      this.items.push({
        number: '',
        name: '',
        price: 0,
      });
    },

    async deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()

      for (let i = 0; i < this.mainEntrees_all.length; i++) {
        if (item.name === this.mainEntrees_all[i].name) {
          this.count -= 1;
          this.enable_entrees = true;
          this.enalbe_mainProteins = false;
          this.enable_subProteins = false;
          this.enable_toppings = false;
          this.entrees_array.pop(this.entrees_array.length - 1);
        }
      }

      let array = await getItemsFromCategory('mainProtein')
      for (let j = 0; j < array.length; j++) {
        if (item.name === array[j].name) {
          this.enalbe_mainProteins = true;
          this.enable_subProteins = false;
        }
      }

      for (let m = 0; m < this.subProteins_all.length; m++) {
        if (item.name === this.subProteins_all[m].name) {
          this.enable_subProteins = true;
        }
      }

      let array2 = await getItemsFromCategory('mainProtein');
      for (let p = 0; p < this.subProteins_all.length; p++) {
        array2.push(this.subProteins_all[p]);
      }
      for (let o = 0; o < this.toppings_all.length; o++) {
        array2.push(this.toppings_all[o]);
      }
      for (let l = 0; l < array2.length; l++) {
        if (item.name === array2[l].name) {
          this.toppings_array.pop(this.toppings_array.length - 1);
        }
      }

      let array3 = await getItems();
      for (let u = 0; u < array2.length; u++) {
        array3.push(array2[u]);
      }
      for (let y = 0; y < array3.length; y++) {
        if (item.name === array3[y].name) {
          this.calories_total -= array3[y].calories;
        }
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
        alert("Cleared!")
      }
      else {
        for (let i = this.items.length; i >= 0; i--) {
          this.items.pop(i)
        }
      }
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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
    },

    async getItemInfo() {
      this.mainEntrees_all = await getItems();
      this.mainProteins_all = await getItemsFromCategory('mainProtein');
      this.subProteins_all = await getItemsFromCategory('subProtein');
      for (let i = 0; i < this.subProteins_all.length; i++) {
        this.mainProteins_all.push(this.subProteins_all[i]);
      }
      this.toppings_all = await getItemsFromCategory('topping');
    }
  },

  async created() {
    await this.updateItems();
    await this.getItemInfo();
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

</style>
<!-----------Style------------->
