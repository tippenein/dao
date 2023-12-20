(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
  (begin
    ;; Mint initial token supply.
    (try! (contract-call? .core set-extension .proposal-submission true))
    (try! (contract-call? .core set-extension .proposal-voting true))
    (try! (contract-call? .core set-extension .proposal-funding true))
    (try! (contract-call? .core set-extension .membership-token true))
    (try! (contract-call? .membership-token mint u9 sender))
    (try! (contract-call? .membership-token mint u9 'ST380ANQR0PHRGXQWHN7CYMKC8KSJS2MDBW5KDVB3))
    (print "We're going DAO Town")
    (ok true)
  )
)