import React from "react";

import classes from "./BuildControls.css"
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Beacon", type: "beacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        { controls.map(control => {
           return <BuildControl key={control.label}
                                label={control.label}
                                added={() => props.ingredientAdded(control.type)}
                                removed={() => props.ingredientRemove(control.type)}
                                disabled={props.disabled[control.type]}
           />
        }) }
        <button className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
        >ORDER NOW</button>
    </div>
);

export default buildControls;