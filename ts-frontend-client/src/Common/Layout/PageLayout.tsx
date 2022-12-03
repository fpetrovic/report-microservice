import React, {ReactNode} from 'react'
import { Menu, Segment, Sidebar } from 'semantic-ui-react'
import {BrowserRouter} from "react-router-dom";
import sideNavItems from "../../config/sideNavItems";



function PageLayout(props: { router: ReactNode}) {
    function isActive(routePath: string) {
        const currentPath = window.location.pathname

        return routePath === currentPath
    }

    const getMenuItemElements = sideNavItems.map((sideNavItem) => {
        return <Menu.Item active={isActive(sideNavItem.path)} as='a' exact href={sideNavItem.path}>{sideNavItem.name}</Menu.Item>
    })

    return (
        <div className="PageLayout"  style={{'height':'67.7em'}}>
            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    as={Menu}
                    animation='push'
                    icon='labeled'
                    inverted
                    vertical
                    visible
                    width='thin'
                >
                    <BrowserRouter>
                        {getMenuItemElements}
                    </BrowserRouter>
                </Sidebar>

                <Sidebar.Pusher>
                    <Segment basic>
                        {props.router}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    )
}

export default PageLayout
