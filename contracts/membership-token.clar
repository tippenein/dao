;; title: membership-token
;; version:
;; summary:
;; description:

(define-constant ERR_UNAUTHORIZED (err u2000))
(define-constant ERR_NOT_TOKEN_OWNER (err u2001))
(define-constant ERR_MEMBERSHIP_LIMIT_REACHED (err u2002))
(define-constant ERR_TOTAL_SUPPLY (err u2003))
(define-constant ERR_OVERBURN (err u2004))

(define-fungible-token sGrant)

(define-map contracts-data
  principal
  {
    can-mint: bool,
    can-burn: bool
  }
)
(define-constant contract-owner tx-sender)
(define-constant membershipLimit u100000)
(define-data-var dao-owner principal tx-sender)
(define-data-var tokenName (string-ascii 32) "sGrant")
(define-data-var tokenSymbol (string-ascii 10) "SGT")
(define-data-var tokenUri (optional (string-utf8 256)) none)
(define-data-var tokenDecimals uint u6)

;; auth
(define-public (is-dao-or-extension)
  (ok (asserts! (or (is-eq tx-sender .core) (contract-call? .core is-extension contract-caller)) ERR_UNAUTHORIZED))
)

;; (define-read-only (get-contract-can-mint-by-address (address principal))
;;   (default-to
;;     false
;;     (get can-mint (map-get? contracts-data address))
;;   )
;; )

;; (define-read-only (get-contract-can-burn-by-address (address principal))
;;   (default-to
;;     false
;;     (get can-burn (map-get? contracts-data address))
;;   )
;; )

;; movement/ transactions
(define-public (transfer (amount uint) (sender principal) (recipient principal))
	(begin
    ;; (try! (is-dao-or-extension))
    (asserts! (is-eq tx-sender contract-owner) ERR_UNAUTHORIZED)
		(ft-transfer? sGrant amount sender recipient)
	)
)

(define-public (mint (amount uint) (recipient principal))
  (let ((supply (unwrap! (get-total-supply) ERR_TOTAL_SUPPLY)))
      (if (> (+ amount supply) membershipLimit)
        ERR_MEMBERSHIP_LIMIT_REACHED
        (begin
          ;; (try! (is-dao-or-extension))
          (asserts! (is-eq tx-sender contract-owner) ERR_UNAUTHORIZED)
          (print { type: "token", action: "minted", data: { amount: amount, recipient: recipient } })
          ;; (contract-call? token mint-for-dao amount recipient)
          (ft-mint? sGrant amount recipient)
        )
      )
  )
)

(define-public (burn (amount uint) (owner principal))
  (let (
      (supply (unwrap! (get-total-supply) ERR_TOTAL_SUPPLY))
      (balance (unwrap! (get-balance owner) ERR_OVERBURN))
    )
    (if (< balance amount)
      ERR_OVERBURN
      (begin
        ;; (try! (is-dao-or-extension))
        (asserts! (is-eq tx-sender contract-owner) ERR_UNAUTHORIZED)
        (ft-burn? sGrant amount owner)
      )
    )
  )
)

(define-read-only (get-dao-owner)
  (var-get dao-owner)
)

(define-public (set-dao-owner (address principal))
  (begin
    (asserts! (is-eq tx-sender (var-get dao-owner)) (err ERR_UNAUTHORIZED))

    (ok (var-set dao-owner address))
  )
)


(define-read-only (get-name)
  (ok (var-get tokenName))
)

(define-read-only (get-symbol)
  (ok (var-get tokenSymbol))
)

(define-read-only (get-decimals)
  (ok (var-get tokenDecimals))
)

(define-read-only (get-balance (who principal))
  (ok (ft-get-balance sGrant who))
)

(define-read-only (get-total-supply)
  (ok (ft-get-supply sGrant))
)

(define-read-only (get-token-uri)
  (ok (var-get tokenUri))
)