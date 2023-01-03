import React, {ReactNode} from 'react'
import {Container, Menu, Segment, Sidebar} from 'semantic-ui-react'
import {BrowserRouter} from "react-router-dom";
import sideNavItems from "../../config/sideNavItems";



function PageLayout(props: { router: ReactNode}) {
    function isActive(routePath: string) {
        const currentPath = window.location.pathname

        return routePath === currentPath
    }

    const getMenuItemElements = sideNavItems.map((sideNavItem, index) => {
        return <Menu.Item key={index} active={isActive(sideNavItem.path)} as='a' exact="true" href={sideNavItem.path}>{sideNavItem.name}</Menu.Item>
    })

    return (
        <div className={"PageLayout"}>
          <Container className={"container"}>
            <Sidebar.Pushable as={Segment} className={'full-screen-height'}>
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

                <Sidebar.Pusher className="pusher">
                    <Segment basic className={"content-holder"}>
                        {props.router}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Container>
        </div>
    )
}

export default PageLayout
