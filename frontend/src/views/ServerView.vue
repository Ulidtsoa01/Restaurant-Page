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
          <!--Manager button-->
          <router-view :key="$route.fullPath"></router-view>
          <router-link :to="{ path: '/manager' }" style="text-decoration: none; color: inherit;">
            <v-btn elevation="5" class="ma-2" outlined color="orange">Manager View</v-btn>
          </router-link>
        </v-col>
        <right>
          <v-col v-for="k in 1" :key="k">
            <!--ColorBlind mode button-->
            <v-btn v-if="light_mode" @click="light_mode_button" elevation="5" class="ma-2" color="green">Light Mode</v-btn>
            <v-btn v-if="!light_mode" @click="light_mode_button_outlined" elevation="5" class="ma-2" outlined color="green">Light Mode</v-btn>
            <v-btn v-if="dark_mode" @click="dark_mode_button" elevation="5" class="ma-2" color="green">Dark Mode</v-btn>
            <v-btn v-if="!dark_mode" @click="dark_mode_button_outlined" elevation="5" class="ma-2" outlined color="green">Dark Mode</v-btn>
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
          <v-btn elevation="5" class="ma-1" color="green" dark large>Update</v-btn>
          &nbsp;&nbsp;
          <!--Order table-->
          <br>
          <v-data-table :headers="headers" :items="items" sort-by="" class="elevation-1">
            <template v-slot:top>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click.native="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click.native="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!--Dialog-->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click.native="deleteItemConfirm">OK</v-btn>
                    <v-btn color="blue darken-1" text @click.native="closeDelete">Cancel</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>

            <!--Delete button-->
            <template v-slot:item.actions="{ item }">
              <v-btn rounded depressed color="error" small @click.native="deleteItem(item)">
                DELETE
              </v-btn>
            </template>
          </v-data-table>

          <!--Add, order, clear buttons-->
          <center>
            <v-card class="pa-2" inlined tile>
              <v-btn large elevation="5" rounded color="green" dark class="mb-2" @click.native="addItem">
                Add
              </v-btn>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-btn large elevation="5" rounded @click.native="getData('Order Placed!'), deleteAllItem('order')"
                class="mb-2" color="orange" dark>Order
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
                <v-btn v-if="dark_mode" @click="tip_control(1)" elevation="8" class="ma-2" outlined color="orange">5%</v-btn>
                <v-btn v-if="light_mode" @click="tip_control(1)" elevation="1" class="ma-2" depressed color="warning">5%</v-btn>
                <v-btn v-if="dark_mode" @click="tip_control(2)" elevation="8" class="ma-2" outlined color="orange">10%</v-btn>
                <v-btn v-if="light_mode" @click="tip_control(2)" elevation="1" class="ma-2" depressed color="warning">10%</v-btn>
                <v-btn v-if="dark_mode" @click="tip_control(3)" elevation="8" class="ma-2" outlined color="orange">15%</v-btn>
                <v-btn v-if="light_mode" @click="tip_control(3)" elevation="1" class="ma-2" depressed color="warning">15%</v-btn>
                <v-btn v-if="dark_mode" @click="tip_control(4)" elevation="8" class="ma-2" outlined color="orange">20%</v-btn>
                <v-btn v-if="light_mode" @click="tip_control(4)" elevation="1" class="ma-2" depressed color="warning">20%</v-btn>
                &nbsp;
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
                      <v-btn v-if="light_mode" @click="click_entrees(k), enable_all_buttons(k), enable_entree_buttons(1)"
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
                      <v-btn v-if="dark_mode" @click="click_proteins(k), disable_mainProteins_buttons(), enalbe_subproteins_buttons()"
                        :disabled="!isDisabled_mainProteins" elevation="10" class="ma-3" outlined color="orange" large>
                        {{ k }}
                      </v-btn>
                      <v-btn v-if="light_mode" @click="click_proteins(k), disable_mainProteins_buttons(), enalbe_subproteins_buttons()"
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
                      <v-btn v-if="dark_mode" @click="click_toppings(k)" :disabled="!isDisabled" elevation="10" class="ma-3" outlined
                        color="orange" large>
                        {{ k }}
                      </v-btn>
                      <v-btn v-if="light_mode" @click="click_toppings(k)" :disabled="!isDisabled" elevation="5" class="ma-3" depressed
                        color="warning" large>
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
import VueClock from '@dangvanthanh/vue-clock';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    count: -1,
    enable_toppings: false,
    enable_entrees: true,
    enalbe_mainProteins: false,
    enalbe_subProteins: false,
    tip: 0,
    sub_total: 0,
    total: 0,
    tip1: false,
    tip2: false,
    tip3: false,
    tip4: false,
    light_mode: false,
    dark_mode: true,

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

    mainEntrees_name: ['Gyros', 'Bowls'],
    subEntrees_name: ['Hummus & Fita', 'Two Falafels', 'Drink'],
    mainProteins_name: ['Chicken', 'Pork', 'Lamb', 'Beef'],
    subProteins_name: ['Extra Chicken', 'Extra Pork', 'Extra Lamb', 'Extra Beef'],
    toppings_name: ['Olive', 'Tomato', 'Lettuce', 'Red Onion', 'Cucumber', 'White Sauce', 'Brown Sauce', 'Extra White Sauce', 'Extra Brown Sauce'],

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
      return this.sub_total = sum;
    },

    isDisabled() {
      return this.enable_toppings;
    },

    isDisabled_mainProteins() {
      return this.enalbe_mainProteins;
    },

    isDisabled_subProteins() {
      return this.enalbe_subProteins;
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

    calculate_tip_1() {
      let sum = 0;
      for (let i = 0; i < this.items.length; i++) {
        sum += this.items[i].price;
      }
      this.tip = sum * 0.05
      return this.tip
    },

    calculate_tip_2() {
      let sum = 0;
      for (let i = 0; i < this.items.length; i++) {
        sum += this.items[i].price;
      }
      this.tip = sum * 0.10;
      return this.tip
    },

    calculate_tip_3() {
      let sum = 0;
      for (let i = 0; i < this.items.length; i++) {
        sum += this.items[i].price;
      }
      this.tip = sum * 0.15;
      return this.tip
    },

    calculate_tip_4() {
      let sum = 0;
      for (let i = 0; i < this.items.length; i++) {
        sum += this.items[i].price;
      }
      this.tip = sum * 0.20;
      return this.tip
    },

    calculate_total() {
      let sum = 0;
      for (let i = 0; i < this.items.length; i++) {
        sum += this.items[i].price;
      }

      return (sum + this.tip).toFixed(2);
    },
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
    click_entrees: function (e) {
      if (e === 'Gyros') {
        this.count++;
        this.items.push({
          number: this.count, name: 'Gyros', price: 8.09
        });
      }
      else if (e === 'Bowls') {
        this.count++;
        this.items.push({
          number: this.count, name: 'Bowls', price: 8.09
        });
      }
      else if (e === 'Hummus & Fita') {
        this.count++;
        this.items.push({
          number: this.count, name: 'Hummus & Fita', price: 3.49
        });
      }
      else if (e === 'Two Falafels') {
        this.count++;
        this.items.push({
          number: this.count, name: 'Two Falafels', price: 3.59
        });
      }
      else if (e === 'Drink') {
        this.count++;
        this.items.push({
          number: this.count, name: 'Drink', price: 2.45
        });
      }
    },

    // Proteins buttons
    click_proteins: function (e) {
      if (e === 'Chicken') {
        this.items.push({
          number: this.count, name: 'Chicken', price: 0
        });
      }
      else if (e === 'Pork') {
        this.items.push({
          number: this.count, name: 'Pork', price: 0
        });
      }
      else if (e === 'Lamb') {
        this.items.push({
          number: this.count, name: 'Lamb', price: 0
        });
      }
      else if (e === 'Beef') {
        this.items.push({
          number: this.count, name: 'Beef', price: 0
        });
      }
      else if (e === 'Extra Chicken') {
        this.items.push({
          number: this.count, name: 'Extra Pork', price: 1.99
        });
      }
      else if (e === 'Extra Pork') {
        this.items.push({
          number: this.count, name: 'Extra Pork', price: 1.99
        });
      }
      else if (e === 'Extra Lamb') {
        this.items.push({
          number: this.count, name: 'Extra Lamb', price: 1.99
        });
      }
      else if (e === 'Extra Beef') {
        this.items.push({
          number: this.count, name: 'Extra Beef', price: 1.99
        });
      }
    },

    // Toppings buttons
    click_toppings: function (e) {
      if (e === 'Olive') {
        this.items.push({
          number: this.count, name: 'Olive', price: 0
        });
      }
      else if (e === 'Tomato') {
        this.items.push({
          number: this.count, name: 'Tomato', price: 0
        });
      }
      else if (e === 'Lettuce') {
        this.items.push({
          number: this.count, name: 'Lettuce', price: 0
        });
      }
      else if (e === 'Red Onion') {
        this.items.push({
          number: this.count, name: 'Red Onion', price: 0
        });
      }
      else if (e === 'Cucumber') {
        this.items.push({
          number: this.count, name: 'Cucumber', price: 0
        });
      }
      else if (e === 'White Sauce') {
        this.items.push({
          number: this.count, name: 'White Sauce', price: 0
        });
      }
      else if (e === 'Brown Sauce') {
        this.items.push({
          number: this.count, name: 'Brwon Sauce', price: 0
        });
      }
      else if (e === 'Extra White Sauce') {
        this.items.push({
          number: this.count, name: 'Extra White Sauce', price: 0.39
        });
      }
      else if (e === 'Extra Brown Sauce') {
        this.items.push({
          number: this.count, name: 'Extra Brown Sauce', price: 0.39
        });
      }
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

    enable_all_buttons(k) {
      if (k === 'Gyros' || k === 'Bowls') {
        this.enable_toppings = true;
        this.enalbe_mainProteins = true;
        this.enalbe_subProteins = false;
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

    enalbe_subproteins_buttons() {
      this.enalbe_subProteins = true;
    },

    disable_subProteins_buttons() {
      this.enalbe_subProteins = false;
    },

    addItem() {
      this.enable_toppings = false;
      this.enable_entrees = true;
      this.enalbe_mainProteins = false;
      this.enalbe_subProteins = false;
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true

      if (item.name === 'Gyros' || item.name === 'Bowls' || item.name === 'Hummus & Fita'
        || item.name === 'Two Falafels' || item.name === 'Drink') {
        this.count -= 1
        this.enable_entrees = true;
        this.enalbe_mainProteins = false;
        this.enalbe_subProteins = false;
        this.enable_toppings = false;
      }

      if (item.name === 'Chicken' || item.name === 'Pork' || item.name === 'Lamb' || item.name === 'Beef') {
        this.enalbe_mainProteins = true;
        this.enalbe_subProteins = false;
      }

      if (item.name === 'Extra Chicken' || item.name === 'Extra Pork' || item.name === 'Extra Lamb' || item.name === 'Extra Beef') {
        this.enalbe_subProteins = true;
      }
    },

    deleteAllItem(e) {
      if (e == 'clear') {
        for (let i = this.items.length; i >= 0; i--) {
          this.items.pop(i)
        }
        this.count = -1;
        this.enalbe_mainProteins = false;
        this.enalbe_subProteins = false;
        this.enable_toppings = false;
        this.enable_entrees = true;
        this.tip = 0;
        this.total = 0;
        this.sub_total = 0;
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
        this.count = -1;
        this.enalbe_mainProteins = false;
        this.enalbe_subProteins = false;
        this.enable_toppings = false;
        this.enable_entrees = true;
        this.tip = 0;
        this.total = 0;
        this.sub_total = 0;
        this.tip1 = false;
        this.tip2 = false;
        this.tip3 = false;
        this.tip4 = false;
      }
    },

    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
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
    }
  }
}
</script>
<!-----------Script------------>


<!-----------Style------------->
<style>

</style>
<!-----------Style------------->
