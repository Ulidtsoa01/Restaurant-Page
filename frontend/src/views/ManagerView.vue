<template>
  <div>
    <v-container class="Top">
      <v-row v-for="j in justify" :key="j" :justify="j">
        <v-col v-for="k in 1" :key="k">
          <!--Server Button-->
          <router-link
            :key="$route.path"
            :to="{ path: '/server' }"
            style="text-decoration: none; color: inherit"
          >
            <v-btn outlined color="orange">Server View</v-btn>
          </router-link>
          <router-view :key="$route.fullPath"></router-view>
          <!--Manager Button-->
          <v-btn elevation="2" class="ma-2" color="warning">Manager View</v-btn>
        </v-col>
        <right>
          <v-col v-for="k in 1" :key="k">
            <!--ColorBlind Mode Button-->
            <v-btn elevation="2" class="ma-2" outlined color="green"
              >Colorblind Mode</v-btn
            >
          </v-col>
        </right>
      </v-row>
    </v-container>

    <v-container class="Mid">
      <center>
        <h1 class="font-weight-bold">Order Trends</h1>
      </center>
      <br />
      <v-row v-for="j in justify" :key="j" :justify="j">
        <!--Left side-->
        <v-row>
          <v-col cols="12" sm="4">
            <v-date-picker v-model="dates" range></v-date-picker>
            <v-text-field
              v-model="dateRangeText"
              label="Date range"
              prepend-icon="mdi-calendar"
              readonly
            ></v-text-field>

            <v-card>
              <center>
                <p class="font-weight-bold">Generate</p>
                <v-btn
                  @click="click_report('Sales')"
                  elevation="2"
                  class="ma-2"
                  outlined
                  color="orange"
                  large
                  >Sales Report
                </v-btn>
                <v-btn
                  @click="click_report('Excess')"
                  elevation="2"
                  class="ma-2"
                  outlined
                  color="orange"
                  large
                  >Excess Report
                </v-btn>
                <v-btn
                  @click="click_report('Restock')"
                  elevation="2"
                  class="ma-2"
                  outlined
                  color="orange"
                  large
                  >Restock Report
                </v-btn>
                <v-btn
                  @click="click_report('Pairs')"
                  elevation="2"
                  class="ma-2"
                  outlined
                  color="orange"
                  large
                  >Pairs Together
                </v-btn>
              </center>
            </v-card>
          </v-col>

          <!--Right side-->
          <v-col v-for="k in 1" :key="k">
            <v-data-table :headers="header" :items="items" class="elevation-1">
            </v-data-table>
          </v-col>
        </v-row>
      </v-row>
    </v-container>

    <v-container class="Bottom">
      <v-col v-for="j in justify" :key="j" :justify="j">
        <center>
          <h1 class="font-weight-bold">Inventory</h1>
        </center>
        <v-data-table :headers="inventoryHeader" :items="inventory" class="elevation-1">
          <template v-slot:top>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <center>
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                    Add
                  </v-btn>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <v-btn color="black" dark class="mb-2"> Edit </v-btn>
                </center>
              </template>

              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ "New Inventory Item" }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.inventoryID"
                          label="Inventory ID"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.itemID"
                          label="Item Id"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.name"
                          label="Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.category"
                          label="Category"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.price"
                          label="Price"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.quantity"
                          label="Quantity"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.numSold"
                          label="Number Sold"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.vendor"
                          label="Vendor"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.purchasePrice"
                          label="Purchase Price"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedInventory.batch"
                          label="Batch"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click.native="close"> Cancel </v-btn>
                  <v-btn color="blue darken-1" text @click.native="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click.native="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-btn color="blue darken-1" text @click.native="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import {insertOrder} from '../js/backend.js'
import {getQuantityById} from '../js/backend.js'
import {getIdFromName} from '../js/backend.js'
import {getInventory} from '../js/backend.js'
import {addItem} from '../js/backend.js'
import {countItem} from '../js/backend.js'
import {countTopping} from '../js/backend.js'
import {getOrderItemDate} from '../js/backend.js'
import {getOrderToppingDate} from '../js/backend.js'
import {getBigBoyCount} from '../js/backend.js'
import {getBigBoy} from '../js/backend.js'
import {getItemsFromCategory} from '../js/backend.js'
import {getPrices} from '../js/backend.js'

export default {
  data: () => ({
    // Layout
    justify: ["space-between"],
    dates: ["2022-11-01"],
    header: [],

    dialog: false,
    dialogDelete: false,

    salesHeader: [
      { text: "Name", value: "name" },
      { text: "Price", value: "price" },
      { text: "Quantity", value: "quantity" },
      { text: "Revenue", value: "revenue" },
    ],

    excessHeader: [
      { text: "Name", value: "name" },
      { text: "Category", value: "category" },
      { text: "Price", value: "price" },
      { text: "Sold in Time Frame", value: "soldRange" },
      { text: "Percent Sold", value: "percentSold" },
      { text: "Total Sold", value: "totalSold" },
      { text: "Item Quantity", value: "itemQuantity" },
      { text: "Batch Quantity", value: "batchQuantity" },
    ],

    restockHeader: [
      { text: "Name", value: "name" },
      { text: "Category", value: "category" },
      { text: "Price", value: "price" },
      { text: "Sold in Time Frame", value: "soldRange" },
      { text: "Deficit", value: "deficit" },
      { text: "Total Sold", value: "totalSold" },
      { text: "Vendor", value: "vendor" },
      { text: "Purchase Price", value: "purchasePrice" },
      { text: "Batch Quantity", value: "batchQuantity" },
    ],

    pairsHeader: [
      { text: "Entree", value: "entree" },
      { text: "Topping", value: "topping" },
      { text: "Occurences", value: "occurences" },
      { text: "Popular", value: "popular" },
    ],

    inventoryHeader: [
      { text: "Inventory ID", value: "name" },
      { text: "Item ID", value: "price" },
      { text: "Name", value: "quantity" },
      { text: "Category", value: "category" },
      { text: "Price", value: "price" },
      { text: "Quantity", value: "quantity" },
      { text: "Number Sold", value: "numsold" },
      { text: "Vendor", value: "vendor" },
      { text: "Purchase Price", value: "price" },
      { text: "Batch", value: "batch" },
    ],

    items: [],

    inventory: [],

    salesReportRow: {
      name: "",
      price: 0.0,
      quantity: 0,
      revenue: 0,
    },

    pairsRow: {
      entree: "",
      topping: "",
      occurences: 0,
      popular: false,
    },

    editedInventory: {
      inventoryID: 0,
      itemID: 0,
      name: "",
      category: "",
      price: 0.0,
      quantity: 0,
      numSold: 0,
      vendor: "",
      purchasePrice: 0.0,
    },

    defaultInventory: {
      inventoryID: 0,
      itemID: 0,
      name: "",
      category: "",
      price: 0.0,
      quantity: 0,
      numSold: 0,
      vendor: "",
      purchasePrice: 0.0,
    },
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },

  methods: {
    click_report: function (e) {
      if (e === "Sales") {
        this.header = this.salesHeader;
        this.items = [];
        this.items.push({
          name: "Gyro",
          price: 1.0,
          quantity: 4,
          revenue: 11.0,
        });
      } else if (e === "Excess") {
        this.header = this.excessHeader;
        this.items = [];
      } else if (e === "Restock") {
        this.header = this.restockHeader;
        this.items = [];
      } else if (e === "Pairs") {
        this.header = this.pairsHeader;
        this.items = [];
        this.items.push({
          entree: "Gyro",
          topping: "Chicken",
          occurences: 4,
          popular: true,
        });
      }
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedInventory = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedInventory = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedInventory = Object.assign({}, this.defaultInventory);
        this.editedIndex = -1;
      });
    },

    save() {
      this.close();
    },
  },
};
</script>
