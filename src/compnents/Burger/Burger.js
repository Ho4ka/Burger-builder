import React from "react"

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {

    let transformIngredients = Object.keys(props.ingredients)
        .map(ingredientsKey => {
            return [...Array(props.ingredients[ingredientsKey])].map((_, index) => {
              return <BurgerIngredient key={ingredientsKey + index} type={ingredientsKey}/>
            });
        }).reduce((array, element) => {
            return array.concat(element);
        }, []);
    if (transformIngredients.length < 1) {
        transformIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={"bread-top"}/>
            {transformIngredients}
            <BurgerIngredient type={"bread-bottom"}/>
        </div>
    );
};

export default burger;