import { render } from "@testing-library/react";
import { Load } from "../components/Load";

describe( "Test in <TermsAndConditionsu />", () => {
    test("should do match with snapshot", () => {
        const {container} = render( <Load />);
        expect(container).toMatchSnapshot();
    });
});