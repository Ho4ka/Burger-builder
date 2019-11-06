import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../compnents/Burger/Burger";
import BuildControls from "../../compnents/Burger/BuildControls/BuildControls";
import Modal from "../../compnents/UI/Modal/Modal";
import OrderSummary from "../../compnents/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    beacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {}
    // }

    state = {
        ingredients: {
            salad: 0,
            beacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map((ingredientKey) => {
                return ingredients[ingredientKey];
            }).reduce((sum, el) => sum + el,0);
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients)
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        alert("Continue");
    };

   render () {
       const disabledInfo = {
           ...this.state.ingredients
       };
       for (let key in disabledInfo) {
           disabledInfo[key] = disabledInfo[key] <= 0;
       }


        return (
            <Aux>
                <Modal
                    modelClosed={this.purchaseCancelHandler}
                    show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  purchaseCanceled={this.purchaseCancelHandler}
                                  purchaseContinue={this.purchaseContinueHandler}
                                  totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientRemove={this.removeIngredientHandler}
                               ingredientAdded={this.addIngredientHandler}
                               disabled={disabledInfo}
                               totalPrice={this.state.totalPrice}
                               purchasable={this.state.purchasable}
                               ordered={this.purchaseHandler}
                                />
            </Aux>
        );
   }
}

export  default BurgerBuilder;