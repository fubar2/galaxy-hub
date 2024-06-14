const CYPRESS_ACCESSIBILITY_CONFIG = {
    iframes: false,
    ancestry: true,
    includedImpacts: ["serious", "critical"],
};

const CURRENT_DATE = new Date();

describe("Accessibility Testing", () => {
    it("Homepage has no detectable a11y violations on load", () => {
        cy.visit("/").get("#app").injectAxe();
        // Ensure masthead has loaded
        cy.get("#masthead-logo").should("be.visible");
        // Only check for #app; ignores twitter and sidecar.
        cy.checkA11y("#app", CYPRESS_ACCESSIBILITY_CONFIG);
    });
    it("Use page has no detectable a11y violations on load", () => {
        cy.visit("/use/").get("#app").injectAxe();
        // Ensure masthead has loaded
        cy.get("#masthead-logo").should("be.visible");
        // We really shouldn't be using cy.wait, but the problem here is that
        // the table contents fade in and we have to wait for the animation to
        // complete prior to checking contrast.
        cy.wait(500);
        cy.checkA11y("#app", CYPRESS_ACCESSIBILITY_CONFIG);
    });
    it(`GCC${CURRENT_DATE.getUTCFullYear()} page has no detectable a11y violations on load`, () => {
        cy.visit(`/events/gcc${CURRENT_DATE.getUTCFullYear()}/`).get("#app").injectAxe();
        // Ensure masthead has loaded
        cy.get("#masthead-logo").should("be.visible");
        // Only check for #app; ignores twitter and sidecar.
        cy.checkA11y("#app", CYPRESS_ACCESSIBILITY_CONFIG);
    });
});
