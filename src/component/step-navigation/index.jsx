/* eslint-disable react/prop-types */
import React from 'react'
import "./index.scss"
const StepNavigation = ({ currentStep = 1 }) => {
    const steps = [
        { id: 1, title: 'Event Information', subtitle: 'Step 1' },
        { id: 2, title: 'Time & Ticket', subtitle: 'Step 2' },
        { id: 3, title: 'Setting', subtitle: 'Step 3' },
        { id: 4, title: 'Payment Information', subtitle: 'Step 4' },
    ];

    return (
        <div className="step-navigation">
            {steps.map((step, index) => (
                <div
                    key={step.id}
                    className={`step-item ${currentStep === step.id ? 'active' : ''}`}
                >

                    <div className="step-content">
                        <div className="step-title">{step.title}</div>
                        <div className="step-subtitle">{step.subtitle}</div>
                    </div>
                    {index < steps.length - 0 && <div className="step-arrow" />}
                </div>
            ))}
        </div>
    );
};

export default StepNavigation
