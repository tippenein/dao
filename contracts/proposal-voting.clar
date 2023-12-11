;; title: proposal-voting
;; version:
;; summary:
;; description:

(impl-trait .extension-trait.extension-trait)
(use-trait proposal-trait .proposal-trait.proposal-trait)

(define-constant ERR_UNAUTHORIZED (err u3000))
(define-constant ERR_PROPOSAL_ALREADY_EXECUTED (err u3002))
(define-constant ERR_PROPOSAL_ALREADY_EXISTS (err u3003))
(define-constant ERR_UNKNOWN_PROPOSAL (err u3004))
(define-constant ERR_PROPOSAL_ALREADY_CONCLUDED (err u3005))
(define-constant ERR_PROPOSAL_INACTIVE (err u3006))
(define-constant ERR_PROPOSAL_NOT_CONCLUDED (err u3007))
(define-constant ERR_NO_VOTES_TO_RETURN (err u3008))
(define-constant ERR_END_BLOCK_HEIGHT_NOT_REACHED (err u3009))
(define-constant ERR_DISABLED (err u3010))

(define-map proposals
  principal
  {
    votes-for: uint,
    votes-against: uint,
    start-block-height: uint,
    end-block-height: uint,
    concluded: bool,
    passed: bool,
    proposer: principal,
    title: (string-ascii 50),
    description: (string-utf8 500)
  }
)

(define-map member-total-votes {proposal: principal, voter: principal} uint)

(define-public (is-dao-or-extension)
  (ok (asserts! (or (is-eq tx-sender .core) (contract-call? .core is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (add-proposal (proposal <proposal-trait>) (data {start-block-height: uint, end-block-height: uint, proposer: principal, title: (string-ascii 50), description: (string-utf8 500)}))
  (begin
    (try! (is-dao-or-extension))
    (asserts! (is-none (contract-call? .core executed-at proposal)) ERR_PROPOSAL_ALREADY_EXECUTED)
    (print {event: "propose", proposal: proposal, proposer: tx-sender})
    (ok (asserts! (map-insert proposals (contract-of proposal) (merge {votes-for: u0, votes-against: u0, concluded: false, passed: false} data)) ERR_PROPOSAL_ALREADY_EXISTS))
  )
)

(define-public (conclude (proposal <proposal-trait>))
  (let
    (
      (proposal-data (unwrap! (map-get? proposals (contract-of proposal)) ERR_UNKNOWN_PROPOSAL))
      (passed (> (get votes-for proposal-data) (get votes-against proposal-data)))
    )
    (asserts! (not (get concluded proposal-data)) ERR_PROPOSAL_ALREADY_CONCLUDED)
    (asserts! (>= block-height (get end-block-height proposal-data)) ERR_END_BLOCK_HEIGHT_NOT_REACHED)
    (map-set proposals (contract-of proposal) (merge proposal-data {concluded: true, passed: passed}))
    (print {event: "conclude", proposal: proposal, passed: passed})
    (and passed (try! (contract-call? .core execute proposal tx-sender)))
    (ok passed)
  )
)

(define-public (callback (sender principal) (memo (buff 34)))
  (ok true)
)