import { gridStyle } from "@ory/elements-markup/dist/theme"
import { Button } from "@ory/elements-markup/dist/react-components/button"
import { Card } from "@ory/elements-markup/dist/react-components/card"
import { Typography } from "@ory/elements-markup/dist/react-components/typography"
import { Checkbox } from "@ory/elements-markup/dist/react-components/checkbox"
import { Divider } from "@ory/elements-markup/dist/react-components/divider"

// import { Button } from "../button"
// import { Card } from "../card"
// import { Typography } from "../typography"
// import { Checkbox } from "../checkbox"
// import { Divider } from "../divider"

import { OAuth2Client, OAuth2ConsentRequest } from "@ory/client"
import React from "react"

export type UserConsentCardProps = {
  csrfToken: string
  consent: OAuth2ConsentRequest
  cardImage?: string | React.ReactElement
  client_name: string
  requested_scope?: UserConsentScope[]
  client?: OAuth2Client
  action: string
  className?: string
}

export type UserConsentScope = {
  id: string,
  label: string,
  checked: boolean
}

export const UserConsentCard = ({
  csrfToken,
  consent,
  cardImage,
  client_name = "Unnamed Client",
  requested_scope = [],
  client,
  action,
  className,
}: UserConsentCardProps) => {
  return (
    <Card
      className={className}
      heading={
        <div style={{ textAlign: "center" }}>
          <Typography type="bold">{client_name}</Typography>
        </div>
      }
      image={cardImage}
    >
      <form action={action} method="post">
        <input type="hidden" name="_csrf" value={csrfToken} />
        <input
          type="hidden"
          name="consent_challenge"
          value={consent?.challenge}
        />
        <div className={gridStyle({ gap: 16 })}>
          <div className={gridStyle({ gap: 4 })} style={{ marginBottom: 16 }}>
            <Typography>
              The application requests access to the following permissions:
            </Typography>
          </div>
          <div className={gridStyle({ gap: 4 })}>
            {requested_scope.map((scope) => (
              <Checkbox
                key={scope.id}
                label={scope.label}
                value={scope.id}
                checked={scope.checked}
                name="grant_scope"
              />
            ))}
          </div>
          <div className={gridStyle({ gap: 4 })}>
            <Typography size="xsmall">
              Only grant permissions if you trust this site or app. You do not
              need to accept all permissions.
            </Typography>
          </div>
          <div className={gridStyle({ direction: "row" })}>
            {client?.policy_uri && (
              <a href={client.policy_uri} target="_blank" rel="noreferrer">
                <Typography size="xsmall">Privacy Policy</Typography>
              </a>
            )}
            {client?.tos_uri && (
              <a href={client.tos_uri} target="_blank" rel="noreferrer">
                <Typography size="xsmall">Terms of Service</Typography>
              </a>
            )}
          </div>
          <Divider />
          <div className={gridStyle({ gap: 8 })}>
            <Checkbox
              label="remember my decision"
              id="remember"
              name="remember"
            />
            <Typography size="xsmall">
              Remember this decision for next time. The application will not be
              able to ask for additional permissions without your consent.
            </Typography>
          </div>
          <div
            className={gridStyle({ direction: "row" })}
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Button
              type="submit"
              id="reject"
              name="consent_action"
              value="reject"
              variant="error"
              header="Deny"
            />
            <Button
              type="submit"
              id="accept"
              name="consent_action"
              value="accept"
              variant="semibold"
              header="Allow"
            />
          </div>
        </div>
      </form>
    </Card>
  )
}