import { render } from "@testing-library/react";
import { Reset } from "../components/Reset";

describe( "Test in <TermsAndConditionsu />", () => {
    test("should do match with snapshot", () => {
        const {container} = render( <Reset />);
        expect(container).toMatchSnapshot();
    });
});