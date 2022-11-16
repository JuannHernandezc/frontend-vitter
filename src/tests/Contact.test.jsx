import { render } from "@testing-library/react";
import { Contact } from "../components/Contact";

describe( "Test in <Home />", () => {
    test("should do match with snapshot", () => {
        const {container} = render( <Contact />);
        expect(container).toMatchSnapshot();
    });
});