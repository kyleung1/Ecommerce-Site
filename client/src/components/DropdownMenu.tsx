const DropdownMenu = () => {

    const DropdownItem = (props) => {
        return (
            <a href = "#" className = "menu-item">
                {props.children}
            </a>
        )
    }

    return (
        <div className = "dropdown">
            <p></p>
            <DropdownItem>hi hello</DropdownItem>
            <DropdownItem>from dropdown</DropdownItem>
        </div>
        
    )
}
export default DropdownMenu