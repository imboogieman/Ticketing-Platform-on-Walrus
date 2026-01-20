/// Event module for managing events on the platform
module ticketing_platform::event {
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;
    use std::string::{Self, String};
    use sui::clock::{Self, Clock};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};

    /// Error codes
    const ENotOrganizer: u64 = 1;
    const EEventEnded: u64 = 2;
    const EInvalidTime: u64 = 3;
    const ESoldOut: u64 = 4;
    const EInsufficientPayment: u64 = 5;

    /// Event object
    public struct Event has key, store {
        id: UID,
        organizer: address,
        name: String,
        description: String,
        location: String,
        start_time: u64,
        end_time: u64,
        ticket_supply: u64,
        tickets_sold: u64,
        ticket_price: u64,
        walrus_blob_id: String,
        is_active: bool,
        balance: Balance<SUI>
    }

    /// Event created event
    public struct EventCreated has copy, drop {
        event_id: ID,
        organizer: address,
        name: String,
        start_time: u64,
        ticket_price: u64
    }

    /// Event updated event
    public struct EventUpdated has copy, drop {
        event_id: ID,
        is_active: bool
    }

    /// Create a new event
    public entry fun create_event(
        name: vector<u8>,
        description: vector<u8>,
        location: vector<u8>,
        start_time: u64,
        end_time: u64,
        ticket_supply: u64,
        ticket_price: u64,
        walrus_blob_id: vector<u8>,
        ctx: &mut TxContext
    ) {
        assert!(start_time < end_time, EInvalidTime);
        
        let event_obj = Event {
            id: object::new(ctx),
            organizer: tx_context::sender(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            location: string::utf8(location),
            start_time,
            end_time,
            ticket_supply,
            tickets_sold: 0,
            ticket_price,
            walrus_blob_id: string::utf8(walrus_blob_id),
            is_active: true,
            balance: balance::zero()
        };

        event::emit(EventCreated {
            event_id: object::uid_to_inner(&event_obj.id),
            organizer: tx_context::sender(ctx),
            name: event_obj.name,
            start_time,
            ticket_price
        });

        transfer::share_object(event_obj);
    }

    /// Update event status
    public entry fun update_event_status(
        event: &mut Event,
        is_active: bool,
        ctx: &mut TxContext
    ) {
        assert!(event.organizer == tx_context::sender(ctx), ENotOrganizer);
        event.is_active = is_active;

        event::emit(EventUpdated {
            event_id: object::uid_to_inner(&event.id),
            is_active
        });
    }

    /// Process ticket purchase (called by ticket module)
    public fun process_ticket_purchase(
        event: &mut Event,
        payment: Coin<SUI>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(event.is_active, EEventEnded);
        assert!(event.tickets_sold < event.ticket_supply, ESoldOut);
        assert!(clock::timestamp_ms(clock) < event.end_time, EEventEnded);
        assert!(coin::value(&payment) >= event.ticket_price, EInsufficientPayment);

        event.tickets_sold = event.tickets_sold + 1;
        let payment_balance = coin::into_balance(payment);
        balance::join(&mut event.balance, payment_balance);
    }

    /// Withdraw event proceeds (organizer only)
    public entry fun withdraw_proceeds(
        event: &mut Event,
        ctx: &mut TxContext
    ) {
        assert!(event.organizer == tx_context::sender(ctx), ENotOrganizer);
        
        let amount = balance::value(&event.balance);
        if (amount > 0) {
            let withdrawn = coin::take(&mut event.balance, amount, ctx);
            transfer::public_transfer(withdrawn, event.organizer);
        };
    }

    // === Getter functions ===

    public fun get_organizer(event: &Event): address {
        event.organizer
    }

    public fun get_ticket_price(event: &Event): u64 {
        event.ticket_price
    }

    public fun get_tickets_sold(event: &Event): u64 {
        event.tickets_sold
    }

    public fun get_ticket_supply(event: &Event): u64 {
        event.ticket_supply
    }

    public fun is_active(event: &Event): bool {
        event.is_active
    }

    public fun get_event_id(event: &Event): ID {
        object::uid_to_inner(&event.id)
    }
}
