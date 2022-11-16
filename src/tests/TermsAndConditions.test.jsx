import { render } from "@testing-library/react";
import { TermsAndConditions } from "../components/TermsAndConditions";

describe( "Test in <TermsAndConditionsu />", () => {
    test("should do match with snapshot", () => {
        const {container} = render( <TermsAndConditions />);
        expect(container).toMatchSnapshot();
    });
});